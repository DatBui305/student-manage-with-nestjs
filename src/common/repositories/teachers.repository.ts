// src/common/repositories/student.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class TeachersRepository {
  private readonly CACHE_KEY_PREFIX = 'teachers_page_';
  private readonly keyArray = [];
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Teacher[];
    total: number;
    page: number;
  }> {
    try {
      const cacheKey = `${this.CACHE_KEY_PREFIX}${page}_${limit}`;
      this.keyArray.push(cacheKey);
      const cachedData = await this.cacheManager.get<{
        data: Teacher[];
        total: number;
      }>(cacheKey);
      if (cachedData) {
        console.log('Fetching from cache');
        return { ...cachedData, page };
      }
      console.log('Fetching from database');
      const [teachers, total] = await this.teachersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      try {
        await this.cacheManager.set(
          cacheKey,
          { data: teachers, total },
          60 * 1000,
        );
        console.log('Cached teacher successfully ');
      } catch (error) {
        console.log('Fail to cached teachers', error.message);
      }
      return { data: teachers, total, page };
    } catch (error) {
      console.log('Failed to get teaches', error.message);
      return { data: [], total: 0, page };
    }
  }
  async findById(id: number): Promise<Teacher | null> {
    try {
      const cacheKey = `teacher:${id}`;
      const cachedTeacher = await this.cacheManager.get<Teacher>(cacheKey);
      if (cachedTeacher) {
        console.log('Fetching from cache');
        return cachedTeacher;
      }
      console.log('Fetching from database');
      const teacher = await this.teachersRepository.findOne({ where: { id } });
      try {
        if (teacher) {
          await this.cacheManager.set(cacheKey, teacher, 60 * 1000);
          console.log('Cached teacher successfully');
        }
      } catch (error) {
        console.log('Failed to cached teacher', error.message);
      }
      return teacher;
    } catch (error) {
      console.log('Fail to get by id', error.message);
    }
    return this.teachersRepository.findOne({ where: { id } });
  }

  async createTeacher(TeacherData: Partial<Teacher>): Promise<Teacher> {
    const Teacher = this.teachersRepository.create(TeacherData);
    const savedTeacher = await this.teachersRepository.save(Teacher);
    this.clearCache();
    return savedTeacher;
  }

  async updateTeacher(
    id: number,
    updateData: Partial<Teacher>,
  ): Promise<Teacher | null> {
    const updated = await this.teachersRepository.update(id, updateData);
    const updatedTeacher = await this.findById(id);
    this.clearCache();
    return updatedTeacher;
  }

  async deleteTeacher(id: number): Promise<boolean> {
    const result = await this.teachersRepository.delete(id);
    this.clearCache();
    return result.affected > 0;
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
