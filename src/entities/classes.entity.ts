// src/entity/Class.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Classes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  class_name: string;

  @Column({ nullable: true })
  teacher_id: number;
}
