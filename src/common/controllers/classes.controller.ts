import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClassesService } from '../services/classes.service';
import { Class } from '../../entities/class.entity';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async getAllClasses(): Promise<Class[]> {
    return this.classesService.getAllClasses();
  }
  @Get(':id')
  async getClassById(@Param('id') id: number): Promise<Class> {
    return this.classesService.getClassById(id);
  }

  @Post()
  async createClass(@Body() ClassData: Partial<Class>): Promise<Class> {
    return this.classesService.createClass(ClassData);
  }

  @Put(':id')
  async updateClass(
    @Param('id') id: number,
    @Body() updateData: Partial<Class>,
  ): Promise<Class> {
    return this.classesService.updateClass(id, updateData);
  }

  @Delete(':id')
  async deleteClass(@Param('id') id: number): Promise<{ message: string }> {
    const isDeleted = await this.classesService.deleteClass(id);
    if (!isDeleted) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return { message: 'Class deleted successfully' };
  }
}
