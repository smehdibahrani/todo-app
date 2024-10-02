import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TodoList extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [Types.ObjectId], ref: 'TodoItem' })
  todoItems: [Types.ObjectId];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
