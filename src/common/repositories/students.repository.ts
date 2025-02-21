// src/common/repositories/student.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from '../../entities/student.entity';

@Injectable()
export class StudentsRepository {
  constructor(
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
  ) {}

  async findAll(): Promise<Students[]> {
    return this.studentsRepository.find();
  }
}
