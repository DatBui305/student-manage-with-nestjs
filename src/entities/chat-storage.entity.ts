import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
import { ChatRoom } from 'src/entities/chat-room';

@Entity({ name: 'chat_storages' })
export class ChatStorage {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Admin, (admin) => admin.chatStorage)
  admin: Admin;

  @OneToMany(() => ChatRoom, (room) => room.chatStorage, {
    cascade: true,
  })
  rooms: ChatRoom[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
