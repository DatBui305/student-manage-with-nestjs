// src/common/repositories/student.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class TeachersRepository {
  private readonly CACHE_KEY = 'all_teachers';
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<Teacher[]> {
    try {
      const cachedTeachers = await this.cacheManager.get<Teacher[]>(
        this.CACHE_KEY,
      );
      if (cachedTeachers) {
        console.log('Fetching from cache');
        return cachedTeachers;
      }
      console.log('Fetching from database');
      const teachers = await this.teachersRepository.find();
      try {
        await this.cacheManager.set(this.CACHE_KEY, teachers, 60 * 1000);
        console.log('Cached teacher successfully ');
      } catch (error) {
        console.log('Fail to cached teachers', error.message);
      }
      return teachers;
    } catch (error) {
      console.log('Failed to get teaches', error.message);
      return await this.teachersRepository.find();
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
    await this.cacheManager.del(this.CACHE_KEY);
  }
}
