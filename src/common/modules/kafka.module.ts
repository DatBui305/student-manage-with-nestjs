import { Module } from '@nestjs/common';
import { KafkaConsumerService } from '../services/kafka.consumer.service';
import { KafkaProducerService } from '../services/kafka.proceducer.service';

@Module({
  providers: [KafkaProducerService, KafkaConsumerService],
  exports: [KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule {}
