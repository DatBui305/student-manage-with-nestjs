// src/common/services/student.service.ts
import { Injectable } from '@nestjs/common';
import { SubjectsRepository } from '../repositories/subjects.entity';
import { Subject } from '../../entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) {}

  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectsRepository.findAll();
  }
}
