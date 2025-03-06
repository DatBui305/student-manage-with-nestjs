import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomRepository } from 'src/common/repositories/chat-room.repository';
import { ChatStorageRepository } from 'src/common/repositories/chat-storage.repository';
import { ChatRoom } from 'src/entities/chat-room';
import { ChatRoomController } from 'src/common/controllers/chat-room.controller';
import { ChatRoomService } from 'src/common/services/chat-room.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomController],
  providers: [ChatRoomRepository, ChatStorageRepository, ChatRoomService],
  exports: [ChatRoomRepository, ChatStorageRepository, ChatRoomService],
})
export class ChatRoomModule {}
