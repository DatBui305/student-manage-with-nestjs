import { Injectable, NotFoundException } from '@nestjs/common';
import { Teacher } from 'src/entities/teacher.entity';
import { TeachersRepository } from '../repositories/teachers.repository';

@Injectable()
export class TeachersService {
  constructor(private readonly teachersRepository: TeachersRepository) {}

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teachersRepository.findAll();
  }

  async getTeacherById(id: number): Promise<Teacher> {
    const Teacher = await this.teachersRepository.findById(id);
    if (!Teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return Teacher;
  }

  async createTeacher(TeacherData: Partial<Teacher>): Promise<Teacher> {
    return this.teachersRepository.createTeacher(TeacherData);
  }

  async updateTeacher(
    id: number,
    updateData: Partial<Teacher>,
  ): Promise<Teacher> {
    await this.getTeacherById(id); // Kiểm tra sinh viên tồn tại trước khi cập nhật
    return this.teachersRepository.updateTeacher(id, updateData);
  }

  async deleteTeacher(id: number): Promise<boolean> {
    await this.getTeacherById(id); // Kiểm tra sinh viên tồn tại trước khi xóa
    return this.teachersRepository.deleteTeacher(id);
  }
}
