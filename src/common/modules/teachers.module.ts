import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from '../controllers/teachers.controller';
import { TeachersService } from '../services/teachers.service';
import { TeachersRepository } from '../repositories/teachers.repository';
import { Teacher } from '../../entities/teacher.entity';
import { RedisModule } from 'src/common/modules/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), RedisModule],
  controllers: [TeachersController],
  providers: [TeachersService, TeachersRepository],
  exports: [TeachersService, TeachersRepository],
})
export class TeachersModule {}
