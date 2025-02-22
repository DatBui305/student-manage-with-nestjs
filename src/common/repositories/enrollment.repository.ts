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
  async findById(id: number): Promise<Enrollment | null> {
    return this.enrollmentsRepository.findOne({ where: { id } });
  }

  async createEnrollment(classData: Partial<Enrollment>): Promise<Enrollment> {
    const newClass = this.enrollmentsRepository.create(classData);
    return this.enrollmentsRepository.save(newClass);
  }

  async updateEnrollment(
    id: number,
    updateData: Partial<Enrollment>,
  ): Promise<Enrollment | null> {
    await this.enrollmentsRepository.update(id, updateData);
    return this.findById(id);
  }

  async deleteEnrollment(id: number): Promise<boolean> {
    const result = await this.enrollmentsRepository.delete(id);
    return result.affected > 0;
  }
}
