import { Injectable } from '@nestjs/common';
import { MessageRepository } from 'src/common/repositories/message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}
  async createMessage(content: string, roomId: number) {
    return this.messageRepository.createMessage(content, roomId);
  }

  async updateMessage(id: number, content: string) {
    return this.messageRepository.updateMessage(id, content);
  }

  async deleteMessage(id: number) {
    return this.messageRepository.deleteMessage(id);
  }
}
