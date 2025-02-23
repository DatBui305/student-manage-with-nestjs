// src/common/controllers/Teachers.controller.ts
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
import { TeachersService } from '../services/teachers.service';
import { Teacher } from 'src/entities/teacher.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  async getAllTeacher(): Promise<Teacher[]> {
    return this.teachersService.getAllTeachers();
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: number): Promise<Teacher> {
    return this.teachersService.getTeacherById(id);
  }

  @Post()
  async createTeacher(@Body() TeacherData: Partial<Teacher>): Promise<Teacher> {
    return this.teachersService.createTeacher(TeacherData);
  }

  @Put(':id')
  async updateTeacher(
    @Param('id') id: number,
    @Body() updateData: Partial<Teacher>,
  ): Promise<Teacher> {
    return this.teachersService.updateTeacher(id, updateData);
  }

  @Delete(':id')
  async deleteTeacher(@Param('id') id: number): Promise<{ message: string }> {
    const isDeleted = await this.teachersService.deleteTeacher(id);
    if (!isDeleted) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return { message: 'Teacher deleted successfully' };
  }
}
