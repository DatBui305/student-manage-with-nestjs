import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from 'src/common/controllers/admin.controller';
import { AdminRepository } from 'src/common/repositories/admin.repository';
import { AdminService } from 'src/common/services/admin.service';
import { Admin } from 'src/entities/admin.entity';
import { ChatStorage } from 'src/entities/chat-storage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, ChatStorage])],

  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [AdminService, AdminRepository],
})
export class AdminModule {}
