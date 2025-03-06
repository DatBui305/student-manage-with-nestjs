import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ChatStorageService } from '../services/chat-storage.service';
import { ChatRoomService } from 'src/common/services/chat-room.service';

@Controller('chat-room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}
  @Get(':storageId')
  async getRoom(@Param('storageId') storageId: number) {
    console.log('controller ' + storageId);
    return this.chatRoomService.getRoomsByStorageId(storageId);
  }
  @Post('/storage1/:storageId1/storage2/:storageId2')
  async CreateRoom(
    @Param('storageId1') storageId1: number,
    @Param('storageId2') storageId2: number,
    @Body('name') name: string,
  ) {
    return this.chatRoomService.createRoom(storageId1, storageId2, name);
  }
}
