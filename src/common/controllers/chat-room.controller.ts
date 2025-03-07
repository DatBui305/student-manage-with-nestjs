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

  @Get('/admin/:adminId')
  async getRoomByAdminID(@Param('adminId') adminId: number) {
    console.log('controller ' + adminId);
    return this.chatRoomService.findRoomsByAdminId(adminId);
  }
  @Get('/room-chat/:roomId')
  async getRoomByID(@Param('roomId') roomId: number) {
    console.log('controller ' + roomId);
    return this.chatRoomService.getRoomById(roomId);
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
