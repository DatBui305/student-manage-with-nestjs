import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classes } from '../../entities/classes.entity';

@Injectable()
export class ClassesRepository {
  constructor(
    @InjectRepository(Classes)
    private classesRepository: Repository<Classes>,
  ) {}

  async findAll(): Promise<Classes[]> {
    return this.classesRepository.find();
  }
}
