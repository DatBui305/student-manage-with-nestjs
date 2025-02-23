import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Class } from './entities/class.entity';
import { Enrollment } from './entities/enrollment.entity';
import { Teacher } from './entities/teacher.entity';
import { Subject } from './entities/subject.entity';
import { ClassesModule } from './common/modules/classes.module';
import { SubjectsModule } from './common/modules/subjects.module';
import { TeachersModule } from './common/modules/teachers.module';
import { EnrollmentsModule } from './common/modules/enrollments.module';
import { RedisModule } from './common/modules/redis.module';
import { StudentsModule } from './common/modules/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '30052003',
      database: 'student_management',
      entities: [Student, Class, Enrollment, Teacher, Subject],
      synchronize: false,
    }),
    StudentsModule,
    ClassesModule,
    SubjectsModule,
    TeachersModule,
    EnrollmentsModule,
    RedisModule,
  ],
})
export class AppModule {}
