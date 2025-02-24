import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({
      username,
      password: hashedPassword,
    });
    return this.adminRepository.save(admin);
  }

  async login(username: string, password: string) {
    const admin = await this.adminRepository.findOne({ where: { username } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { username: admin.username, role: admin.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateAdmin(username: string) {
    return this.adminRepository.findOne({ where: { username } });
  }
}
