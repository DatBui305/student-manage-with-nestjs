import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Message } from 'src/entities/message.entity';
import { ChatGateway } from 'src/common/middleware/chat.gateway';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly chatGateway: ChatGateway,
  ) {
    super(Message, dataSource.createEntityManager());
  }
  async createMessage(
    content: string,
    roomId: number,
    receiverId: number,
    senderID: number,
  ): Promise<Message> {
    const message = this.create({
      content,
      sender: { id: senderID },
      receiver: { id: receiverId },
      room: { id: roomId },
    });
    const savedMessage = await this.save(message);

    // Emit sự kiện "newMessage" sau khi lưu thành công
    this.chatGateway.server
      .to(`room-${roomId}`)
      .emit('newMessage', savedMessage);

    return savedMessage;
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
