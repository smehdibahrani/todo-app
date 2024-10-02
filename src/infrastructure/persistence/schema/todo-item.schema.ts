import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TodoItem extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  priority: number;

  @Prop({ type: Types.ObjectId, ref: 'TodoList' })
  todoList: Types.ObjectId;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
