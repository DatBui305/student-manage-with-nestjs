import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Subject } from './subject.entity';
@Entity({ name: 'enrollments' })
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' }) // 🛠 Chỉ định tên cột trong DB
  student: Student;

  @ManyToOne(() => Subject, (subject) => subject.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' }) // 🛠 Chỉ định tên cột trong DB
  subject: Subject;

  @CreateDateColumn({ type: 'timestamp' })
  enrollment_date: Date;
}
