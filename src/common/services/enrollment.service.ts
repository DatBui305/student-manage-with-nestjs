// src/common/services/student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentsRepository } from '../repositories/enrollment.repository';
import { Enrollment } from 'src/entities/enrollment.entity';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly enrollmentsRepository: EnrollmentsRepository) {}

  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.enrollmentsRepository.findAll();
  }

  async getEnrollmentById(id: number): Promise<Enrollment> {
    const Enrollment = await this.enrollmentsRepository.findById(id);
    if (!Enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    return Enrollment;
  }

  async createEnrollment(
    EnrollmentData: Partial<Enrollment>,
  ): Promise<Enrollment> {
    return this.enrollmentsRepository.createEnrollment(EnrollmentData);
  }

  async updateEnrollment(
    id: number,
    updateData: Partial<Enrollment>,
  ): Promise<Enrollment> {
    await this.getEnrollmentById(id); // Kiểm tra sinh viên tồn tại trước khi cập nhật
    return this.enrollmentsRepository.updateEnrollment(id, updateData);
  }

  async deleteEnrollment(id: number): Promise<boolean> {
    await this.getEnrollmentById(id); // Kiểm tra sinh viên tồn tại trước khi xóa
    return this.enrollmentsRepository.deleteEnrollment(id);
  }
}
