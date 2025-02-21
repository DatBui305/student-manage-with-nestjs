import { Injectable } from '@nestjs/common';
import { Teacher } from 'src/entities/teacher.entity';
import { TeachersRepository } from '../repositories/teachers.repository';

@Injectable()
export class TeachersService {
  constructor(private readonly teachersRepository: TeachersRepository) {}

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teachersRepository.findAll();
  }
}
