// src/common/controllers/students.controller.ts
import { Controller, Get } from '@nestjs/common';
import { EnrollmentsService } from '../services/enrollment.service';
import { Enrollment } from 'src/entities/enrollment.entity';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  async getAllEnrollment(): Promise<Enrollment[]> {
    return this.enrollmentsService.getAllEnrollments();
  }
}
