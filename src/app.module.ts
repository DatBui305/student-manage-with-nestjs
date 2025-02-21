// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './common/controllers/students.controller';
import { StudentsService } from './common/services/students.service';
import { StudentsRepository } from './common/repositories/students.repository';
import { Student } from './entities/student.entity';
import { ClassesController } from './common/controllers/classes.controller';
import { ClassesService } from './common/services/classes.service';
import { ClassesRepository } from './common/repositories/classes.repository';
import { Class } from './entities/class.entity';
import { Enrollment } from './entities/enrollment.entity';
import { Teacher } from './entities/teacher.entity';
import { Subject } from './entities/subject.entity';
import { SubjectsController } from './common/controllers/subjects.controller';
import { SubjectsRepository } from './common/repositories/subjects.entity';
import { SubjectsService } from './common/services/subjects.service';
import { TeachersController } from './common/controllers/teachers.controller';
import { TeachersService } from './common/services/teachers.service';
import { TeachersRepository } from './common/repositories/teachers.repository';
import { EnrollmentsController } from './common/controllers/enrollements.controller';
import { EnrollmentsRepository } from './common/repositories/enrollment.repository';
import { EnrollmentsService } from './common/services/enrollment.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Thay thế bằng tên người dùng của bạn
      password: '30052003', // Thay thế bằng mật khẩu của bạn
      database: 'student_management', // Tên cơ sở dữ liệu
      entities: [Student, Class, Enrollment, Teacher, Subject],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Student, Class, Enrollment, Teacher, Subject]),
  ],
  controllers: [
    AppController,
    StudentsController,
    ClassesController,
    SubjectsController,
    TeachersController,
    EnrollmentsController,
  ],
  providers: [
    AppService,
    StudentsService,
    StudentsRepository,
    ClassesService,
    ClassesRepository,
    SubjectsRepository,
    SubjectsService,
    TeachersService,
    TeachersRepository,
    EnrollmentsRepository,
    EnrollmentsService,
  ],
})
export class AppModule {}
