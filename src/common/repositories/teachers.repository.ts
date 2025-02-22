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
  async findById(id: number): Promise<Teacher | null> {
    return this.teachersRepository.findOne({ where: { id } });
  }

  async createTeacher(TeacherData: Partial<Teacher>): Promise<Teacher> {
    const Teacher = this.teachersRepository.create(TeacherData);
    return this.teachersRepository.save(Teacher);
  }

  async updateTeacher(
    id: number,
    updateData: Partial<Teacher>,
  ): Promise<Teacher | null> {
    await this.teachersRepository.update(id, updateData);
    return this.findById(id);
  }

  async deleteTeacher(id: number): Promise<boolean> {
    const result = await this.teachersRepository.delete(id);
    return result.affected > 0;
  }
}
