import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatStorage } from './chat-storage.entity';
import { Message } from './message.entity';

@Entity({ name: 'chat_rooms' })
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Example: 'support-room-123'

  @ManyToOne(() => ChatStorage, (chatStorage) => chatStorage.rooms)
  chatStorage: ChatStorage;

  @OneToMany(() => Message, (message) => message.room, {
    cascade: true,
  })
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
