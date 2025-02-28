// src/common/repositories/classes.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../../entities/class.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ClassesRepository {
  private readonly CACHE_KEY_PREFIX = 'classes_page_';
  private readonly keyArray = [];
  constructor(
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Class[]; total: number; page: number }> {
    try {
      const cacheKey = `${this.CACHE_KEY_PREFIX}${page}_${limit}`;
      this.keyArray.push(cacheKey);
      const cachedClasses = await this.cacheManager.get<{
        data: Class[];
        total: number;
      }>(cacheKey);
      if (cachedClasses) {
        console.log('⚡ Fetching classes from cache');
        return { ...cachedClasses, page };
      }
      console.log('🔍 Fetching classes from database');
      const [classes, total] = await this.classesRepository.findAndCount({
        relations: ['teacher'],
        skip: (page - 1) * limit,
        take: limit,
      });
      try {
        await this.cacheManager.set(
          cacheKey,
          {
            data: classes,
            total,
          },
          60 * 1000,
        );
        console.log('💾 Cached classes successfully');
      } catch (error) {
        console.error('❌ Failed to cache classes:', error.message);
      }

      return { data: classes, total, page };
    } catch (error) {
      console.error('❌ Error in findAll:', error.message);
      return { data: [], total: 0, page };
    }
  }

  async findById(id: number): Promise<Class | null> {
    const cacheKey = `class_${id}`;
    this.keyArray.push(cacheKey);
    try {
      const cachedClass = await this.cacheManager.get<Class>(cacheKey);
      if (cachedClass) {
        console.log(`⚡ Fetching class ${id} from cache`);
        return cachedClass;
      }

      console.log(`🔍 Fetching class ${id} from database`);
      const foundClass = await this.classesRepository.findOne({
        where: { id },
        relations: ['teacher'],
      });

      if (foundClass) {
        await this.cacheManager.set(cacheKey, foundClass, 60 * 1000);
      }

      return foundClass;
    } catch (error) {
      console.error(`❌ Error in findById(${id}):`, error.message);
      return null;
    }
  }
  async createClass(classData: Partial<Class>): Promise<Class> {
    const newClass = this.classesRepository.create(classData);
    const savedClass = await this.classesRepository.save(newClass);

    // Clear cache after creating a new class
    await this.clearCache();
    return savedClass;
  }
  async updateClass(
    id: number,
    updateData: Partial<Class>,
  ): Promise<Class | null> {
    await this.classesRepository.update(id, updateData);
    const updatedClass = await this.findById(id);

    if (updatedClass) {
      await this.cacheManager.set(`class_${id}`, updatedClass, 60 * 1000);
    }

    // Clear cache to update class list
    await this.clearCache();
    return updatedClass;
  }

  /**
   * Delete a class by ID and clear cache
   */
  async deleteClass(id: number): Promise<boolean> {
    const result = await this.classesRepository.delete(id);

    if (result.affected > 0) {
      await this.cacheManager.del(`class_${id}`);
      await this.clearCache();
      return true;
    }
    return false;
  }
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
