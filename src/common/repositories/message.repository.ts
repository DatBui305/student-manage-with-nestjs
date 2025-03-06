import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Message } from 'src/entities/message.entity';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(private readonly dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }
  async createMessage(content: string, roomId: number): Promise<Message> {
    const message = this.create({
      content,
      room: { id: roomId },
    });

    return this.save(message);
  }
  async updateMessage(id: number, content: string): Promise<Message> {
    const message = await this.findOneBy({ id });
    if (!message) {
      throw new Error('Message not found');
    }
    message.content = content;
    return this.save(message);
  }
  async deleteMessage(id: number): Promise<void> {
    await this.delete(id);
  }
}
