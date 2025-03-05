import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/message.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(private readonly dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }

  async findMessagesByRoomId(roomId: number): Promise<Message[]> {
    return this.find({
      where: { room: { id: roomId } },
      order: { createdAt: 'ASC' },
    });
  }
}
