import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  CreateTodoListDto,
  UpdateTodoListDto,
} from '../../application/dto/todo-list.dto';
import { TodoListAppService } from '../../application/services/todo-list.service';

@Controller('todo-lists')
export class TodoListController {
  constructor(private todoListAppService: TodoListAppService) {}

  @Post()
  async create(@Req() req: any, @Body() dto: CreateTodoListDto) {
    const { id } = req.currentUser;
    await this.todoListAppService.create(id, dto.title);
  }

  @Get()
  async getAll(@Req() req: any) {
    const { id } = req.currentUser;
    return this.todoListAppService.getAllByUser(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTodoListDto) {
    await this.todoListAppService.update(id, dto.title);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.todoListAppService.delete(id);
  }
}
