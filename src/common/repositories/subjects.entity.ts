// src/common/repositories/Subject.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';

@Injectable()
export class SubjectsRepository {
  constructor(
    @InjectRepository(Subject)
    private SubjectsRepository: Repository<Subject>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return this.SubjectsRepository.find();
  }
}
