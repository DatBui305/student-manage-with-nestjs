import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatStorageRepository } from '../repositories/chat-storage.repository';
import { AdminRepository } from '../repositories/admin.repository';
import { ChatRoomRepository } from '../repositories/chat-room.repository';

@Injectable()
export class ChatStorageService {
  constructor(private readonly chatStorageRepository: ChatStorageRepository) {}
  async createStorage(adminId: number) {
    return this.chatStorageRepository.createStorageForAdmin(adminId);
  }
  async getStorageByAdmin(adminId: number) {
    const storage = await this.chatStorageRepository.findByAdminId(adminId);
    if (!storage) {
      throw new NotFoundException('Chat storage not found for this admin');
    }
    return storage;
  }
}
