// src/common/controllers/Enrollments.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EnrollmentsService } from '../services/enrollment.service';
import { Enrollment } from 'src/entities/enrollment.entity';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  async getAllEnrollment(): Promise<Enrollment[]> {
    return this.enrollmentsService.getAllEnrollments();
  }

  @Get(':id')
  async getEnrollmentById(@Param('id') id: number): Promise<Enrollment> {
    return this.enrollmentsService.getEnrollmentById(id);
  }

  @Post()
  async createEnrollment(
    @Body() EnrollmentData: Partial<Enrollment>,
  ): Promise<Enrollment> {
    return this.enrollmentsService.createEnrollment(EnrollmentData);
  }

  @Put(':id')
  async updateEnrollment(
    @Param('id') id: number,
    @Body() updateData: Partial<Enrollment>,
  ): Promise<Enrollment> {
    return this.enrollmentsService.updateEnrollment(id, updateData);
  }

  @Delete(':id')
  async deleteEnrollment(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    const isDeleted = await this.enrollmentsService.deleteEnrollment(id);
    if (!isDeleted) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    return { message: 'Enrollment deleted successfully' };
  }
}
