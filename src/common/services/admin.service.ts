import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from 'src/common/repositories/admin.repository';
import { Admin } from 'src/entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private readonly adminRepository: AdminRepository,
  ) {}

  async createAdmin(data: Partial<Admin>): Promise<Admin> {
    const admin = this.adminRepository.create(data);
    return this.adminRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find({ relations: ['chatStorage'] });
  }
}
