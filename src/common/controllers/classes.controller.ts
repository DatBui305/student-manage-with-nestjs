import { Controller, Get } from '@nestjs/common';
import { ClassesService } from '../services/classes.service';
import { Classes } from '../../entities/classes.entity';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async getAllClasses(): Promise<Classes[]> {
    return this.classesService.getAllClasses();
  }
}
