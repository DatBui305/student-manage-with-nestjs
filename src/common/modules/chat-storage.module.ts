import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatStorageRepository } from 'src/common/repositories/chat-storage.repository';
import { ChatStorage } from 'src/entities/chat-storage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatStorage])],
  providers: [ChatStorageRepository],
  exports: [ChatStorageRepository],
})
export class ChatStorageModule {}
