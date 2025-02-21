// src/common/repositories/student.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { Teacher } from 'src/entities/teacher.entity';

@Injectable()
export class TeachersRepository {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
  ) {}

  async findAll(): Promise<Teacher[]> {
    return this.teachersRepository.find();
  }
  async findById(): Promise<Teacher[]> {
    return this.teachersRepository.find();
  }
}
