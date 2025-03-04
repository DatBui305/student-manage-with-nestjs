import { Module } from '@nestjs/common';
import { KafkaService } from '../services/kafka.service';

@Module({
  providers: [KafkaService],
  exports: [KafkaService], // Để service khác inject được
})
export class KafkaModule {}
