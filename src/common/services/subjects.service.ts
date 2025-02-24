// src/common/services/student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { SubjectsRepository } from '../repositories/subjects.repository';
import { Subject } from '../../entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) {}

  async getAllSubjects(
    page: number,
    limit: number,
  ): Promise<{
    data: Subject[];
    total: number;
    page: number;
  }> {
    return this.subjectsRepository.findAll(page, limit);
  }
  async getSubjectById(id: number): Promise<Subject> {
    const Subject = await this.subjectsRepository.findById(id);
    if (!Subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return Subject;
  }

  async createSubject(SubjectData: Partial<Subject>): Promise<Subject> {
    return this.subjectsRepository.createSubject(SubjectData);
  }

  async updateSubject(
    id: number,
    updateData: Partial<Subject>,
  ): Promise<Subject> {
    await this.getSubjectById(id); // Kiểm tra sinh viên tồn tại trước khi cập nhật
    return this.subjectsRepository.updateSubject(id, updateData);
  }

  async deleteSubject(id: number): Promise<boolean> {
    await this.getSubjectById(id); // Kiểm tra sinh viên tồn tại trước khi xóa
    return this.subjectsRepository.deleteSubject(id);
  }
}
