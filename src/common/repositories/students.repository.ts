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

  async findById(id: number): Promise<Student | null> {
    return this.studentsRepository.findOne({ where: { id } });
  }

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentsRepository.create(studentData);
    return this.studentsRepository.save(student);
  }

  async updateStudent(
    id: number,
    updateData: Partial<Student>,
  ): Promise<Student | null> {
    await this.studentsRepository.update(id, updateData);
    return this.findById(id);
  }

  async deleteStudent(id: number): Promise<boolean> {
    const result = await this.studentsRepository.delete(id);
    return result.affected > 0;
  }
}
