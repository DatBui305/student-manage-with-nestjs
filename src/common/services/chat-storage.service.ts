import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatStorageRepository } from '../repositories/chat-storage.repository';
import { ChatRoomRepository } from '../repositories/chat-room.repository';

@Injectable()
export class ChatStorageService {
  constructor(
    private readonly chatStorageRepository: ChatStorageRepository,
    // private readonly adminRepository: AdminRepository,
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async getStorageByAdmin(adminId: number) {
    const storage = await this.chatStorageRepository.findByAdminId(adminId);
    if (!storage) {
      throw new NotFoundException('Chat storage not found for this admin');
    }
    return storage;
  }

  //   async createRoom(adminId: number, roomName: string) {
  //     let storage = await this.chatStorageRepository.findByAdminId(adminId);

  //     if (!storage) {
  //       const admin = await this.adminRepository.findOne({ where: { id: adminId } });
  //       if (!admin) {
  //         throw new NotFoundException('Admin not found');
  //       }

  //       storage = this.chatStorageRepository.create({ admin, rooms: [] });
  //       await this.chatStorageRepository.save(storage);
  //     }

  //     const newRoom = this.chatRoomRepository.create({ name: roomName, chatStorage: storage });
  //     return this.chatRoomRepository.save(newRoom);
  //   }

  //   async getAllRooms(adminId: number) {
  //     const storage = await this.getStorageByAdmin(adminId);
  //     return this.chatRoomRepository.findRoomsByStorageId(storage.id);
  //   }
}
