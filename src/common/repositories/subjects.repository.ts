// src/common/repositories/Subject.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class SubjectsRepository {
  private readonly CACHE_KEY_PREFIX = 'subjects_page_';
  private readonly keyArray = [];
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Subject[];
    total: number;
    page: number;
  }> {
    try {
      const cacheKey = `${this.CACHE_KEY_PREFIX}${page}_${limit}`;
      const cachedSubjects = await this.cacheManager.get<{
        data: Subject[];
        total: number;
      }>(cacheKey);

      if (cachedSubjects) {
        console.log('Fetching from cache');
        return { ...cachedSubjects, page };
      }
      console.log('Fetching from database');
      const [subjects, total] = await this.subjectsRepository.findAndCount({
        relations: ['teacher', 'class'],
        skip: (page - 1) * limit,
        take: limit,
      });
      try {
        await this.cacheManager.set(
          cacheKey,
          {
            data: subjects,
            total,
          },
          60 * 1000,
        );
        console.log('Cased subjects successfully');
      } catch (error) {
        console.log('Failed to cache subjects', error.message);
      }
      return { data: subjects, total, page };
    } catch (error) {
      console.log('Error to find all subjects', error.message);
      return { data: [], total: 0, page };
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
      const subject = await this.subjectsRepository.findOne({
        where: { id },
        relations: ['teacher', 'class'],
      });
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
