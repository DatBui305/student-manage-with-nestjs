import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/common/middleware/chat.gateway';

@Module({
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
