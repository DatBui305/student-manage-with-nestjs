import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsController } from '../controllers/enrollements.controller';
import { EnrollmentsService } from '../services/enrollment.service';
import { EnrollmentsRepository } from '../repositories/enrollment.repository';
import { Enrollment } from '../../entities/enrollment.entity';
import { RedisModule } from 'src/common/modules/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment]), RedisModule],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, EnrollmentsRepository],
  exports: [EnrollmentsService, EnrollmentsRepository],
})
export class EnrollmentsModule {}
