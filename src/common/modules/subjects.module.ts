import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsController } from '../controllers/subjects.controller';
import { SubjectsService } from '../services/subjects.service';
import { Subject } from '../../entities/subject.entity';
import { SubjectsRepository } from '../repositories/subjects.repository';
import { RedisModule } from 'src/common/modules/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), RedisModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, SubjectsRepository],
  exports: [SubjectsService, SubjectsRepository],
})
export class SubjectsModule {}
