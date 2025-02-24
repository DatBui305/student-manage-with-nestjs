import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from '../controllers/classes.controller';
import { ClassesService } from '../services/classes.service';
import { ClassesRepository } from '../repositories/classes.repository';
import { Class } from '../../entities/class.entity';
import { RedisModule } from 'src/common/modules/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Class]), RedisModule],
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
  exports: [ClassesService, ClassesRepository],
})
export class ClassesModule {}
