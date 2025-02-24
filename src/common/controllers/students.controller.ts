// src/common/controllers/students.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { Student } from '../../entities/student.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/constants/roles.enum';
import { RolesGuard } from '../guards/roles.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getStudents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.studentsService.getAllStudents(Number(page), Number(limit));
  }

  @Get(':id')
  async getStudentById(@Param('id') id: number): Promise<Student> {
    return this.studentsService.getStudentById(id);
  }

  @Post()
  async createStudent(@Body() studentData: Partial<Student>): Promise<Student> {
    return this.studentsService.createStudent(studentData);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') id: number,
    @Body() updateData: Partial<Student>,
  ): Promise<Student> {
    return this.studentsService.updateStudent(id, updateData);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: number): Promise<{ message: string }> {
    const isDeleted = await this.studentsService.deleteStudent(id);
    if (!isDeleted) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return { message: 'Student deleted successfully' };
  }
}
