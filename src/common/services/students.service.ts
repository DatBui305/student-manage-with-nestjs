// src/common/services/student.service.ts
import { Injectable } from '@nestjs/common';
import { StudentsRepository } from '../repositories/students.repository';
import { Students } from '../../entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async getAllStudents(): Promise<Students[]> {
    return this.studentsRepository.findAll();
  }
}
