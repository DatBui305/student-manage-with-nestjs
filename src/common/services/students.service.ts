// src/common/services/student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentsRepository } from '../repositories/students.repository';
import { Student } from '../../entities/student.entity';
// import { KafkaProducerService } from './kafka.proceducer.service';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    // private readonly kafkaProducer: KafkaProducerService,
  ) {}

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
    const student = await this.studentsRepository.createStudent(studentData);
    // await this.kafkaProducer.sendMessage(
    //   'student-topic',
    //   JSON.stringify(student),
    // );
    return student;
  }

  async updateStudent(
    id: number,
    updateData: Partial<Student>,
  ): Promise<Student> {
    await this.getStudentById(id);
    return this.studentsRepository.updateStudent(id, updateData);
  }

  async deleteStudent(id: number): Promise<boolean> {
    await this.getStudentById(id); // Kiểm tra sinh viên tồn tại trước khi xóa
    return this.studentsRepository.deleteStudent(id);
  }
}
