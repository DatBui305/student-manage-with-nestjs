// src/common/repositories/Subject.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class SubjectsRepository {
  private readonly CACHE_KEY = 'all_subjects';

  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<Subject[]> {
    try {
      const cachedSubjects = await this.cacheManager.get<Subject[]>(
        this.CACHE_KEY,
      );
      if (cachedSubjects) {
        console.log('Fetching from cache');
        return cachedSubjects;
      }
      console.log('Fetching from database');
      const subjects = await this.subjectsRepository.find();
      try {
        await this.cacheManager.set(this.CACHE_KEY, subjects, 60 * 1000);
        console.log('Cased subjects successfully');
      } catch (error) {
        console.log('Failed to cache subjects', error.message);
      }
    } catch (error) {
      console.log('Error to find all subjects', error.message);
      return this.subjectsRepository.find();
    }
  }

  async findById(id: number): Promise<Subject | null> {
    try {
      const cacheKey = `subject:${id}`;
      const cachedSubject = await this.cacheManager.get<Subject>(cacheKey);
      if (cachedSubject) {
        console.log('Fetching subject from cache');
        return cachedSubject;
      }
      console.log('Fetching subject from database');
      const subject = await this.subjectsRepository.findOne({ where: { id } });
      if (subject) {
        try {
          await this.cacheManager.set(cacheKey, subject, 60 * 1000);
          console.log('Cache subject successfully');
        } catch (error) {
          console.log('Failed to cached subject');
        }
      }
      return subject;
    } catch (error) {
      console.log('Failed to get subject', error.message);
      return this.subjectsRepository.findOne({ where: { id } });
    }
  }

  async createSubject(SubjectData: Partial<Subject>): Promise<Subject> {
    const Subject = this.subjectsRepository.create(SubjectData);
    const savedSubject = await this.subjectsRepository.save(Subject);
    this.clearCache();
    return savedSubject;
  }

  async updateSubject(
    id: number,
    updateData: Partial<Subject>,
  ): Promise<Subject | null> {
    await this.subjectsRepository.update(id, updateData);
    const updatedSubject = await this.findById(id);
    this.clearCache();
    return updatedSubject;
  }

  async deleteSubject(id: number): Promise<boolean> {
    const result = await this.subjectsRepository.delete(id);
    this.clearCache();
    return result.affected > 0;
  }

  async clearCache(): Promise<void> {
    await this.cacheManager.del(this.CACHE_KEY);
  }
}
