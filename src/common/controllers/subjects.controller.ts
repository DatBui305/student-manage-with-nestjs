// src/common/controllers/Subjects.controller.ts
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
import { SubjectsService } from '../services/subjects.service';
import { Subject } from '../../entities/subject.entity';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectsService.getAllSubjects();
  }
  @Get(':id')
  async getSubjectById(@Param('id') id: number): Promise<Subject> {
    return this.subjectsService.getSubjectById(id);
  }

  @Post()
  async createSubject(@Body() SubjectData: Partial<Subject>): Promise<Subject> {
    return this.subjectsService.createSubject(SubjectData);
  }

  @Put(':id')
  async updateSubject(
    @Param('id') id: number,
    @Body() updateData: Partial<Subject>,
  ): Promise<Subject> {
    return this.subjectsService.updateSubject(id, updateData);
  }

  @Delete(':id')
  async deleteSubject(@Param('id') id: number): Promise<{ message: string }> {
    const isDeleted = await this.subjectsService.deleteSubject(id);
    if (!isDeleted) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return { message: 'Subject deleted successfully' };
  }
}
