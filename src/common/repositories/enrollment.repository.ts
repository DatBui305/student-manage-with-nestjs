import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from 'src/entities/enrollment.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class EnrollmentsRepository {
  private readonly CACHE_KEY_PREFIX = 'entrollment_page_';
  private readonly keyArray = [];
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Enrollment[];
    total: number;
    page: number;
  }> {
    try {
      const cacheKey = `${this.CACHE_KEY_PREFIX}${page}_${limit}`;
      const cachedEnrollments = await this.cacheManager.get<{
        data: Enrollment[];
        total: number;
      }>(cacheKey);
      if (cachedEnrollments) {
        console.log('⚡ Fetching enrollments from cache');
        return { ...cachedEnrollments, page };
      }
      console.log('🔍 Fetching enrollments from database');
      const [enrollments, total] =
        await this.enrollmentsRepository.findAndCount({
          relations: ['student', 'subject'],
          skip: (page - 1) * limit,
          take: limit,
        });

      try {
        await this.cacheManager.set(
          cacheKey,
          {
            data: enrollments,
            total,
          },
          60 * 1000,
        );
        console.log('💾 Cached enrollments successfully');
      } catch (error) {
        console.error('❌ Failed to cache enrollments:', error.message);
      }

      return { data: enrollments, total, page };
    } catch (error) {
      console.error('❌ Error in findAll:', error.message);
      return { data: [], total: 0, page };
    }
  }

  /**
   * Find an enrollment by ID with caching
   */
  async findById(id: number): Promise<Enrollment | null> {
    const cacheKey = `enrollment_${id}`;
    try {
      const cachedEnrollment =
        await this.cacheManager.get<Enrollment>(cacheKey);
      if (cachedEnrollment) {
        console.log(`⚡ Fetching enrollment ${id} from cache`);
        return cachedEnrollment;
      }

      console.log(`🔍 Fetching enrollment ${id} from database`);
      const foundEnrollment = await this.enrollmentsRepository.findOne({
        where: { id },
        relations: ['student', 'subject'],
      });

      if (foundEnrollment) {
        await this.cacheManager.set(cacheKey, foundEnrollment, 60 * 1000);
      }

      return foundEnrollment;
    } catch (error) {
      console.error(`❌ Error in findById(${id}):`, error.message);
      return null;
    }
  }

  /**
   * Create a new enrollment and clear cache
   */
  async createEnrollment(
    enrollmentData: Partial<Enrollment>,
  ): Promise<Enrollment> {
    const newEnrollment = this.enrollmentsRepository.create(enrollmentData);
    const savedEnrollment =
      await this.enrollmentsRepository.save(newEnrollment);

    await this.clearCache();
    return savedEnrollment;
  }

  /**
   * Update an enrollment and update cache
   */
  async updateEnrollment(
    id: number,
    updateData: Partial<Enrollment>,
  ): Promise<Enrollment | null> {
    await this.enrollmentsRepository.update(id, updateData);
    const updatedEnrollment = await this.findById(id);

    if (updatedEnrollment) {
      await this.cacheManager.set(
        `enrollment_${id}`,
        updatedEnrollment,
        60 * 1000,
      );
    }

    await this.clearCache();
    return updatedEnrollment;
  }

  /**
   * Delete an enrollment and clear cache
   */
  async deleteEnrollment(id: number): Promise<boolean> {
    const result = await this.enrollmentsRepository.delete(id);

    if (result.affected > 0) {
      await this.cacheManager.del(`enrollment_${id}`);
      await this.clearCache();
      return true;
    }
    return false;
  }

  /**
   * Clear cache
   */
  async clearCache(): Promise<void> {
    if (this.keyArray.length === 0) {
      console.log('No keys to clear from cache.');
      return;
    }

    for (const key of this.keyArray) {
      await this.cacheManager.del(key);
    }
    // console.log('Cleared cache for keys:', this.keyArray);
  }
}
