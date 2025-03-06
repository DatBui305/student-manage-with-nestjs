import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoomRepository } from '../repositories/chat-room.repository';

@Injectable()
export class ChatRoomService {
  constructor(private readonly chatRoomRepository: ChatRoomRepository) {}
  async createRoom(storageId1: number, storageId2: number, name: string) {
    return this.chatRoomRepository.createRoom(storageId1, storageId2, name);
  }

  async getRoomsByStorageId(storageId: number) {
    return this.chatRoomRepository.findRoomsByStorageId(storageId);
  }
}
