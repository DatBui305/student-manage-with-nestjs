import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class StudentsRepository {
  private readonly CACHE_KEY = 'all_students';

  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<Student[]> {
    try {
      const cachedStudents = await this.cacheManager.get<Student[]>(
        this.CACHE_KEY,
      );
      if (cachedStudents) {
        console.log('⚡ Fetching students from cache');
        return cachedStudents;
      }

      console.log('🔍 Fetching students from database');
      const students = await this.studentsRepository.find();

      try {
        await this.cacheManager.set(
          this.CACHE_KEY,
          students,
          60 * 1000, // TTL in milliseconds
        );
        console.log('💾 Cached students successfully');
      } catch (error) {
        console.error('❌ Failed to cache students:', error.message);
      }

      return students;
    } catch (error) {
      console.error('❌ Error in findAll:', error.message);
      return this.studentsRepository.find();
    }
  }

  async findById(id: number): Promise<Student | null> {
    try {
      const cacheKey = `student:${id}`;
      const cachedStudent = await this.cacheManager.get<Student>(cacheKey);
      if (cachedStudent) {
        console.log('⚡ Fetching student from cache');
        return cachedStudent;
      }

      console.log('🔍 Fetching student from database');
      const student = await this.studentsRepository.findOne({ where: { id } });
      if (student) {
        await this.cacheManager.set(cacheKey, student, 60 * 1000);
        console.log('💾 Cached student successfully');
      }
      return student;
    } catch (error) {
      console.error('❌ Error in findById:', error.message);
      return null;
    }
  }

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentsRepository.create(studentData);
    const savedStudent = await this.studentsRepository.save(student);
    this.clearCache();
    return savedStudent;
  }

  async updateStudent(
    id: number,
    updateData: Partial<Student>,
  ): Promise<Student | null> {
    await this.studentsRepository.update(id, updateData);
    const updatedStudent = await this.findById(id);
    if (updatedStudent) {
      await this.cacheManager.set(`student:${id}`, updatedStudent, 60 * 1000);
      this.clearCache();
    }
    return updatedStudent;
  }

  async deleteStudent(id: number): Promise<boolean> {
    const result = await this.studentsRepository.delete(id);
    if (result.affected > 0) {
      await this.cacheManager.del(`student:${id}`);
      this.clearCache();
      return true;
    }
    return false;
  }

  async clearCache(): Promise<void> {
    await this.cacheManager.del(this.CACHE_KEY);
  }
}
