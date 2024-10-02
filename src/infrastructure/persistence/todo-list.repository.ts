import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TodoList as TodoListModel } from './schema/todo-list.schema';
import { TodoListEntity } from '../../domain/entities/todo-list.entity';
import { Repository } from '../../domain/repositories/repository';
import { TodoItemEntity } from '../../domain/entities/todo-item.entity';

@Injectable()
export class TodoListRepository implements Repository<TodoListEntity> {
  constructor(
    @InjectModel(TodoListModel.name)
    private todoListModel: Model<TodoListModel>,
  ) {}

  async create(todoListEntity: TodoListEntity): Promise<TodoListEntity> {
    const newTodoList = new this.todoListModel(todoListEntity);
    const newTodoListCreated = await newTodoList.save();
    return this.mapToTodoListEntity(newTodoListCreated);
  }

  async findAll(): Promise<TodoListEntity[]> {
    const todoLists = await this.todoListModel.find().exec();
    return todoLists.map((todoList) => this.mapToTodoListEntity(todoList));
  }

  async findAllByUser(userId: string): Promise<TodoListEntity[]> {
    const todoLists = await this.todoListModel
      .find({ userId })
      .populate('todoItems')
      .exec();
    console.log(todoLists);
    return todoLists.map((todoList) => this.mapToTodoListEntity(todoList));
  }

  async findById(id: string): Promise<TodoListEntity> {
    const todoList = await this.todoListModel.findById({ _id: id }).exec();
    return this.mapToTodoListEntity(todoList);
  }

  async delete(id: string): Promise<void> {
    await this.todoListModel.findByIdAndDelete(id);
  }

  async update(
    id: string,
    todoListEntity: Pick<TodoListEntity, 'title'>,
  ): Promise<void> {
    await this.todoListModel.updateOne(
      { _id: id },
      { title: todoListEntity.title },
    );
  }

  async updateAddItemToTodoList(id: string, todoItemId: string): Promise<void> {
    const todoList = await this.todoListModel.findOne({ _id: id }).exec();
    todoList.todoItems.push(new Types.ObjectId(todoItemId));
    await todoList.save();
  }

  private mapToTodoListEntity(todoList): TodoListEntity {
    return new TodoListEntity(
      todoList._id.toString(),
      todoList.userId.toString(),
      todoList.title,
      todoList.todoItems.map(
        (todoItem) =>
          new TodoItemEntity(
            todoItem._id.toString(),
            todoItem.title,
            todoItem.description,
            todoItem.priority,
            null,
          ),
      ),
    );
  }
}
