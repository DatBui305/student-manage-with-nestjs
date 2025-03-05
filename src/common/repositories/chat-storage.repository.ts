import { Injectable } from '@nestjs/common';
import { ChatStorage } from 'src/entities/chat-storage.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ChatStorageRepository extends Repository<ChatStorage> {
  constructor(private readonly dataSource: DataSource) {
    super(ChatStorage, dataSource.createEntityManager());
  }

  async findByAdminId(adminId: number): Promise<ChatStorage | null> {
    return this.findOne({
      where: { admin: { id: adminId } },
      relations: ['rooms'],
    });
  }
}
