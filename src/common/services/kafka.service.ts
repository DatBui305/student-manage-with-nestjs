import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  private client: ClientKafka;

  constructor() {
    this.client = new ClientKafka({
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notification-group',
      },
    });
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async sendNotification(topic: string, message: any) {
    await this.client.emit(topic, message);
  }
}
