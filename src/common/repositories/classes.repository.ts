// src/common/repositories/classes.repository.ts
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

  async findById(id: number): Promise<Class | null> {
    return this.classesRepository.findOne({ where: { id } });
  }

  async createClass(classData: Partial<Class>): Promise<Class> {
    const newClass = this.classesRepository.create(classData);
    return this.classesRepository.save(newClass);
  }

  async updateClass(
    id: number,
    updateData: Partial<Class>,
  ): Promise<Class | null> {
    await this.classesRepository.update(id, updateData);
    return this.findById(id);
  }

  async deleteClass(id: number): Promise<boolean> {
    const result = await this.classesRepository.delete(id);
    return result.affected > 0;
  }
}
