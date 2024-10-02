import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import {
  CreateTodoItemDto,
  UpdateTodoItemDto,
} from '../../application/dto/todo-item.dto';
import { TodoItemAppService } from '../../application/services/todo-item.service';

@Controller('todo-items')
export class TodoItemController {
  constructor(private todoItemAppService: TodoItemAppService) {}

  @Post()
  async create(@Body() dto: CreateTodoItemDto) {
    await this.todoItemAppService.create(
      dto.todoListId,
      dto.title,
      dto.description,
      dto.priority,
    );
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTodoItemDto) {
    await this.todoItemAppService.update(
      id,
      dto.title,
      dto.description,
      dto.priority,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.todoItemAppService.delete(id);
  }
}
