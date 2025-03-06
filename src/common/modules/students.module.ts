import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from '../controllers/students.controller';
import { StudentsService } from '../services/students.service';
import { StudentsRepository } from '../repositories/students.repository';
import { Student } from '../../entities/student.entity';
import { RedisModule } from './redis.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    RedisModule,
    AuthModule,
    // KafkaModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],
  exports: [StudentsService, StudentsRepository],
})
export class StudentsModule {}
