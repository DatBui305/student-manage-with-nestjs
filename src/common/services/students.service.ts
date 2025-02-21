// src/common/services/student.service.ts
import { Injectable } from '@nestjs/common';
import { StudentsRepository } from '../repositories/students.repository';
import { Student } from '../../entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async getAllStudents(): Promise<Student[]> {
    return this.studentsRepository.findAll();
  }
}
