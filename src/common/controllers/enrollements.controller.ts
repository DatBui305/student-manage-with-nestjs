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
  Query,
} from '@nestjs/common';
import { EnrollmentsService } from '../services/enrollment.service';
import { Enrollment } from 'src/entities/enrollment.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/constants/roles.enum';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  async getAllEnrollment(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.enrollmentsService.getAllEnrollments(page, limit);
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
