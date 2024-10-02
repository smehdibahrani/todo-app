import { Injectable } from '@nestjs/common';
import { TodoItem as TodoItemModel } from './schema/todo-item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { TodoItemEntity } from '../../domain/entities/todo-item.entity';
import { Repository } from '../../domain/repositories/repository';

@Injectable()
export class TodoItemRepository implements Repository<TodoItemEntity> {
  constructor(
    @InjectModel(TodoItemModel.name)
    private todoItemModel: Model<TodoItemModel>,
  ) {}

  async create(todoItemEntity: TodoItemEntity): Promise<TodoItemEntity> {
    const newTodo = new this.todoItemModel(todoItemEntity);
    const newTodoCreated = await newTodo.save();
    return this.mapToTodoItemEntity(newTodoCreated);
  }

  async findAll(): Promise<TodoItemEntity[]> {
    const todoItems = await this.todoItemModel.find().exec();
    return todoItems.map((todoItem) => this.mapToTodoItemEntity(todoItem));
  }

  async findById(id: string): Promise<TodoItemEntity> {
    const todoItem = await this.todoItemModel.findById(id).exec();
    return this.mapToTodoItemEntity(todoItem);
  }

  async findByTodoListId(todoListId: string): Promise<TodoItemEntity[]> {
    const todoItems = await this.todoItemModel
      .find({ todoList: todoListId })
      .exec();
    return todoItems.map((todoItem) => this.mapToTodoItemEntity(todoItem));
  }

  async delete(id: string): Promise<void> {
    await this.todoItemModel.findByIdAndDelete(id);
  }

  async update(
    id: string,
    todoItemEntity: Omit<TodoItemEntity, 'id' | 'todoList'>,
  ): Promise<void> {
    await this.todoItemModel.updateOne({ _id: id }, todoItemEntity);
  }

  private mapToTodoItemEntity(todoItem): TodoItemEntity {
    return new TodoItemEntity(
      todoItem._id.toString(),
      todoItem.title,
      todoItem.description,
      todoItem.priority,
    );
  }
}
