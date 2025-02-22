// src/common/repositories/Subject.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';

@Injectable()
export class SubjectsRepository {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  async findById(id: number): Promise<Subject | null> {
    return this.subjectsRepository.findOne({ where: { id } });
  }

  async createSubject(SubjectData: Partial<Subject>): Promise<Subject> {
    const Subject = this.subjectsRepository.create(SubjectData);
    return this.subjectsRepository.save(Subject);
  }

  async updateSubject(
    id: number,
    updateData: Partial<Subject>,
  ): Promise<Subject | null> {
    await this.subjectsRepository.update(id, updateData);
    return this.findById(id);
  }

  async deleteSubject(id: number): Promise<boolean> {
    const result = await this.subjectsRepository.delete(id);
    return result.affected > 0;
  }
}
