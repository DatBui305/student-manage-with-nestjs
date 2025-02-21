// src/common/services/student.service.ts
import { Injectable } from '@nestjs/common';
import { Class } from '../../entities/class.entity';
import { ClassesRepository } from '../repositories/classes.repository';

@Injectable()
export class ClassesService {
  constructor(private readonly classesRepository: ClassesRepository) {}
  async getAllClasses(): Promise<Class[]> {
    return this.classesRepository.findAll();
  }
}
