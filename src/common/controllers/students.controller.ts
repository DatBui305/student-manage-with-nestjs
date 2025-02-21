// src/common/controllers/students.controller.ts
import { Controller, Get } from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { Student } from '../../entities/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentsService.getAllStudents();
  }
}
