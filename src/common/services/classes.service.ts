// src/common/services/student.service.ts
import { Injectable } from '@nestjs/common';
import { Classes } from '../../entities/classes.entity';
import { ClassesRepository } from '../repositories/classes.repository';

@Injectable()
export class ClassesService {
  constructor(private readonly classesRepository: ClassesRepository) {}
  async getAllClasses(): Promise<Classes[]> {
    return this.classesRepository.findAll();
  }
}
