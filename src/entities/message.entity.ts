import { Admin } from 'src/entities/admin.entity';
import { ChatRoom } from 'src/entities/chat-room';
import { ChatStorage } from 'src/entities/chat-storage.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @OneToOne(() => Admin, (admin) => admin.id)
  sender: Admin;
  @OneToOne(() => Admin, (admin) => admin.id)
  receiver: Admin;
  @ManyToOne(() => ChatRoom, (room) => room.messages)
  room: ChatRoom;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
