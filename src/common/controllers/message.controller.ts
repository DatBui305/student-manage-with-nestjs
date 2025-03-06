import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ChatRoomService } from 'src/common/services/chat-room.service';
import { MessageService } from 'src/common/services/message.service';

@Controller('messsage')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/:roomId')
  async CreateMessage(
    @Param('roomId') roomId: number,
    @Body('content') content: string,
  ) {
    return this.messageService.createMessage(content, roomId);
  }

  @Put('/:roomId')
  async UpdateMessage(
    @Param('roomId') roomId: number,
    @Body('content') content: string,
  ) {
    return this.messageService.updateMessage(roomId, content);
  }

  @Delete('/:roomId')
  async DeleteMessage(@Param('roomId') roomId: number) {
    return this.messageService.deleteMessage(roomId);
  }
}
