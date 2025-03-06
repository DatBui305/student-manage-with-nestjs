import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ChatStorageService } from '../services/chat-storage.service';

@Controller('chat-storage')
export class ChatStorageController {
  constructor(private readonly chatStorageService: ChatStorageService) {}
  @Post(':adminId')
  async createStorage(@Param('adminId') adminId: number) {
    console.log('controller ' + adminId);
    return this.chatStorageService.createStorage(adminId);
  }
  @Get(':adminId')
  async getStorage(@Param('adminId') adminId: number) {
    return this.chatStorageService.getStorageByAdmin(adminId);
  }
}
