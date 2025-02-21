import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../../entities/class.entity';

@Injectable()
export class ClassesRepository {
  constructor(
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
  ) {}

  async findAll(): Promise<Class[]> {
    return this.classesRepository.find();
  }
}
