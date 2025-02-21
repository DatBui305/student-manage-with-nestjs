// src/common/services/student.service.ts
import { Injectable } from '@nestjs/common';
import { EnrollmentsRepository } from '../repositories/enrollment.repository';
import { Enrollment } from 'src/entities/enrollment.entity';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly enrollmentsRepository: EnrollmentsRepository) {}

  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.enrollmentsRepository.findAll();
  }
}
