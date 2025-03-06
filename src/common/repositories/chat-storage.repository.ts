import { Injectable } from '@nestjs/common';
import { ChatStorage } from 'src/entities/chat-storage.entity';
import { Admin } from 'src/entities/admin.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ChatStorageRepository extends Repository<ChatStorage> {
  constructor(private readonly dataSource: DataSource) {
    super(ChatStorage, dataSource.createEntityManager());
  }
  async createStorageForAdmin(adminId: number): Promise<ChatStorage> {
    console.log('AdminId::::::::' + adminId);
    const entityManager = this.dataSource.createEntityManager();
    const admin = await entityManager.findOne(Admin, {
      where: { id: adminId },
    });
    if (!admin) {
      throw new Error(`Admin with id ${adminId} not found`);
    }
    const storage = this.create({ admin });

    return await this.save(storage);
  }

  async findByAdminId(adminId: number): Promise<ChatStorage | null> {
    return this.findOne({
      where: { admin: { id: adminId } },
    });
  }
}
