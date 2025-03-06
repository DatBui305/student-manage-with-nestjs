import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AdminService } from 'src/common/services/admin.service';
import { Admin } from 'src/entities/admin.entity';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createAdmin(@Body() data: Partial<Admin>) {
    return this.adminService.createAdmin(data);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }
}
