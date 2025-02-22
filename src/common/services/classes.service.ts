// src/common/services/Class.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Class } from '../../entities/class.entity';
import { ClassesRepository } from '../repositories/classes.repository';

@Injectable()
export class ClassesService {
  constructor(private readonly classesRepository: ClassesRepository) {}
  async getAllClasses(): Promise<Class[]> {
    return this.classesRepository.findAll();
  }

  async getClassById(id: number): Promise<Class> {
    const Class = await this.classesRepository.findById(id);
    if (!Class) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return Class;
  }

  async createClass(ClassData: Partial<Class>): Promise<Class> {
    return this.classesRepository.createClass(ClassData);
  }

  async updateClass(id: number, updateData: Partial<Class>): Promise<Class> {
    await this.getClassById(id); // Kiểm tra sinh viên tồn tại trước khi cập nhật
    return this.classesRepository.updateClass(id, updateData);
  }

  async deleteClass(id: number): Promise<boolean> {
    await this.getClassById(id); // Kiểm tra sinh viên tồn tại trước khi xóa
    return this.classesRepository.deleteClass(id);
  }
}
