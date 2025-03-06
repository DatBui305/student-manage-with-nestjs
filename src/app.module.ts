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
import { AuthModule } from 'src/auth/auth.module';
import { Admin } from 'src/entities/admin.entity';
import { KafkaModule } from 'src/common/modules/kafka.module';
import { ChatRoom } from 'src/entities/chat-room';
import { ChatStorage } from 'src/entities/chat-storage.entity';
import { Message } from 'src/entities/message.entity';
import { AdminModule } from 'src/common/modules/admin.module';
import { ChatStorageModule } from 'src/common/modules/chat-storage.module';
import { ChatRoomModule } from 'src/common/modules/chat-room.module';
import { MessageModule } from 'src/common/modules/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '30052003',
      database: 'student_management',
      entities: [
        Student,
        Class,
        Enrollment,
        Teacher,
        Subject,
        Admin,
        ChatRoom,
        ChatStorage,
        Message,
      ],
      synchronize: true,
    }),
    StudentsModule,
    ClassesModule,
    SubjectsModule,
    TeachersModule,
    EnrollmentsModule,
    RedisModule,
    AuthModule,
    AdminModule,
    ChatStorageModule,
    ChatRoomModule,
    MessageModule,
  ],
})
export class AppModule {}
