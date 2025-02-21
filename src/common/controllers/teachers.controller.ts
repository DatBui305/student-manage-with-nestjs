// src/common/controllers/students.controller.ts
import { Controller, Get } from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { Teacher } from 'src/entities/teacher.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  async getAllTeacher(): Promise<Teacher[]> {
    return this.teachersService.getAllTeachers();
  }
}
