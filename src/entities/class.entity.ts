import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Subject } from './subject.entity';

@Entity({ name: 'classes' })
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  class_name: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToMany(() => Subject, (subject) => subject.class)
  subjects: Subject[];
}
