import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatStorageRepository } from 'src/common/repositories/chat-storage.repository';
import { ChatRoom } from 'src/entities/chat-room';
import { MessageController } from 'src/common/controllers/message.controller';
import { MessageRepository } from 'src/common/repositories/message.repository';
import { MessageService } from 'src/common/services/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [MessageController],
  providers: [MessageRepository, MessageService],
  exports: [MessageRepository, MessageService],
})
export class MessageModule {}
