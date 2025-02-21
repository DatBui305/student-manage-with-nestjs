import { Controller, Get } from '@nestjs/common';
import { ClassesService } from '../services/classes.service';
import { Class } from '../../entities/class.entity';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async getAllClasses(): Promise<Class[]> {
    return this.classesService.getAllClasses();
  }
}
