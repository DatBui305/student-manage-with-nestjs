import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from 'src/entities/enrollment.entity';

@Injectable()
export class EnrollmentsRepository {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
  ) {}

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentsRepository.find();
  }
}
