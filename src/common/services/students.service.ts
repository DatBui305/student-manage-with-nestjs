// src/common/services/student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentsRepository } from '../repositories/students.repository';
import { Student } from '../../entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async getAllStudents(
    page: number,
    limit: number,
  ): Promise<{
    data: Student[];
    total: number;
    page: number;
  }> {
    return this.studentsRepository.findAll(page, limit);
  }

  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    return this.studentsRepository.createStudent(studentData);
  }

  async updateStudent(
    id: number,
    updateData: Partial<Student>,
  ): Promise<Student> {
    if (id !== updateData.id) {
      throw new Error('ID in request must match ID in data');
    }
    await this.getStudentById(id);
    return this.studentsRepository.updateStudent(id, updateData);
  }

  async deleteStudent(id: number): Promise<boolean> {
    await this.getStudentById(id); // Kiểm tra sinh viên tồn tại trước khi xóa
    return this.studentsRepository.deleteStudent(id);
  }
}
