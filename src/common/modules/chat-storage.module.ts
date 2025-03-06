import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { ChatStorage } from 'src/entities/chat-storage.entity';
import { AdminRepository } from 'src/common/repositories/admin.repository';
import { ChatRoomRepository } from 'src/common/repositories/chat-room.repository';
import { ChatStorageRepository } from 'src/common/repositories/chat-storage.repository';
import { ChatStorageService } from 'src/common/services/chat-storage.service';
import { ChatStorageController } from 'src/common/controllers/chat-storage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatStorage, Admin])],
  controllers: [ChatStorageController],
  providers: [
    ChatStorageService,
    ChatStorageRepository,
    ChatRoomRepository,
    AdminRepository,
  ],
  exports: [ChatStorageService, ChatStorageRepository],
})
export class ChatStorageModule {}
