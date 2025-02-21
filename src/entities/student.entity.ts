import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'] })
  gender: 'Male' | 'Female' | 'Other';

  @Column({ nullable: true })
  class_id: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
