import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoom } from 'src/entities/chat-room';
import { ChatStorage } from 'src/entities/chat-storage.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ChatRoomRepository extends Repository<ChatRoom> {
  constructor(private readonly dataSource: DataSource) {
    super(ChatRoom, dataSource.createEntityManager());
  }

  async findRoomsByStorageId(storageId: number): Promise<ChatRoom[]> {
    return this.find({
      where: [
        { chatStorage1: { id: storageId } },
        { chatStorage2: { id: storageId } },
      ],
      relations: ['messages'],
    });
  }
  async getRoomById(roomId: number): Promise<ChatRoom> {
    return this.findOne({
      where: { id: roomId },
      relations: ['messages'],
    });
  }

  async findRoomsByAdminId(adminId: number): Promise<ChatRoom[]> {
    return this.createQueryBuilder('room')
      .leftJoinAndSelect('room.chatStorage1', 'storage1')
      .leftJoinAndSelect('room.chatStorage2', 'storage2')
      .leftJoin('storage1.admin', 'admin1')
      .leftJoin('storage2.admin', 'admin2')
      .where('admin1.id = :adminId OR admin2.id = :adminId', { adminId })
      .getMany();
  }
  async createRoom(
    storageId1: number,
    storageId2: number,
    name: string,
  ): Promise<ChatRoom> {
    const storageRepo = this.dataSource.getRepository(ChatStorage);

    const storage1 = await storageRepo.findOneBy({ id: storageId1 });
    const storage2 = await storageRepo.findOneBy({ id: storageId2 });

    if (!storage1 || !storage2) {
      throw new NotFoundException('One or both ChatStorage not found');
    }

    const room = this.create({
      chatStorage1: storage1,
      chatStorage2: storage2,
      name,
    });

    return await this.save(room);
  }
}
