import { Injectable } from '@nestjs/common';
import { ChatRoom } from 'src/entities/chat-room';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ChatRoomRepository extends Repository<ChatRoom> {
  constructor(private readonly dataSource: DataSource) {
    super(ChatRoom, dataSource.createEntityManager());
  }

  async findRoomsByStorageId(storageId: number): Promise<ChatRoom[]> {
    return this.find({
      where: { chatStorage: { id: storageId } },
      relations: ['messages'],
    });
  }
}
