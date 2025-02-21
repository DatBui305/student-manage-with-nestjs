// src/common/repositories/student.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';

@Injectable()
export class StudentsRepository {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }
  async findById(): Promise<Student[]> {
    return this.studentsRepository.find();
  }
}
