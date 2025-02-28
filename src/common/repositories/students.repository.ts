import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class StudentsRepository {
  private readonly CACHE_KEY_PREFIX = 'students_page_';
  private readonly keyArray = [];
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Student[]; total: number; page: number }> {
    try {
      const cacheKey = `${this.CACHE_KEY_PREFIX}${page}_${limit}`;
      this.keyArray.push(cacheKey);
      const cachedData = await this.cacheManager.get<{
        data: Student[];
        total: number;
      }>(cacheKey);

      if (cachedData) {
        console.log('⚡ Fetching students from cache');
        return { ...cachedData, page };
      }

      console.log('🔍 Fetching students from database');

      // Tính toán offset để lấy dữ liệu
      const [students, total] = await this.studentsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      // Lưu vào cache với TTL 1 phút
      await this.cacheManager.set(
        cacheKey,
        { data: students, total },
        60 * 1000,
      );
      console.log('💾 Cached students successfully');

      return { data: students, total, page };
    } catch (error) {
      console.error('❌ Error in findAll:', error.message);
      return { data: [], total: 0, page };
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
    if (this.keyArray.length === 0) {
      console.log('No keys to clear from cache.');
      return;
    }

    for (const key of this.keyArray) {
      await this.cacheManager.del(key);
    }
    // console.log('Cleared cache for keys:', this.keyArray);
  }
}
