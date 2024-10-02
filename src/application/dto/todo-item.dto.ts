import { IsNotEmpty } from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty()
  todoListId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  priority: number;
}

export class UpdateTodoItemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  priority: number;
}
