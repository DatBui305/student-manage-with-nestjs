// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './common/controllers/students.controller';
import { StudentsService } from './common/services/students.service';
import { StudentsRepository } from './common/repositories/students.repository';
import { Students } from './entities/student.entity';
import { ClassesController } from './common/controllers/classes.controller';
import { ClassesService } from './common/services/classes.service';
import { ClassesRepository } from './common/repositories/classes.repository';
import { Classes } from './entities/classes.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Thay thế bằng tên người dùng của bạn
      password: '30052003', // Thay thế bằng mật khẩu của bạn
      database: 'student_management', // Tên cơ sở dữ liệu
      entities: [Students, Classes],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Students, Classes]),
  ],
  controllers: [AppController, StudentsController, ClassesController],
  providers: [
    AppService,
    StudentsService,
    StudentsRepository,
    ClassesService,
    ClassesRepository,
  ],
})
export class AppModule {}
