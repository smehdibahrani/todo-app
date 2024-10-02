import { IsNotEmpty } from 'class-validator';

export class CreateTodoListDto {
  @IsNotEmpty()
  title: string;
}

export class UpdateTodoListDto {
  @IsNotEmpty()
  title: string;
}
