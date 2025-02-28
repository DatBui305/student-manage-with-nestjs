import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'student-management',
    brokers: ['localhost:9092'],
  });
  private consumer = this.kafka.consumer({ groupId: 'student-group' });

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'student-topic',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message: ${message.value.toString()}`);
        // Xử lý thông điệp ở đây
      },
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
