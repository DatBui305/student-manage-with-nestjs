// src/common/controllers/students.controller.ts
import { Controller, Get } from '@nestjs/common';
import { SubjectsService } from '../services/subjects.service';
import { Subject } from '../../entities/subject.entity';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectsService.getAllSubjects();
  }
}
