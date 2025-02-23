// src/common/repositories/classes.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../../entities/class.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ClassesRepository {
  private readonly CACHE_KEY = 'all_classes';
  constructor(
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<Class[]> {
    try {
      const cachedClasses = await this.cacheManager.get<Class[]>(
        this.CACHE_KEY,
      );
      if (cachedClasses) {
        console.log('⚡ Fetching classes from cache');
        return cachedClasses;
      }

      console.log('🔍 Fetching classes from database');
      const classes = await this.classesRepository.find();

      try {
        await this.cacheManager.set(this.CACHE_KEY, classes, 60 * 1000);
        console.log('💾 Cached classes successfully');
      } catch (error) {
        console.error('❌ Failed to cache classes:', error.message);
      }

      return classes;
    } catch (error) {
      console.error('❌ Error in findAll:', error.message);
      return await this.classesRepository.find();
    }
  }

  async findById(id: number): Promise<Class | null> {
    const cacheKey = `class_${id}`;
    try {
      const cachedClass = await this.cacheManager.get<Class>(cacheKey);
      if (cachedClass) {
        console.log(`⚡ Fetching class ${id} from cache`);
        return cachedClass;
      }

      console.log(`🔍 Fetching class ${id} from database`);
      const foundClass = await this.classesRepository.findOne({
        where: { id },
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
    await this.cacheManager.del(this.CACHE_KEY);
  }
}
