import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoList, TodoListSchema } from './todo-list.schema';
import { compare, hash } from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [TodoListSchema], default: [] })
  todoLists: TodoList[];

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return compare(candidatePassword, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const saltRounds = 10;
  this.password = await hash(this.password, saltRounds);
  next();
});

UserSchema.method('comparePassword', function (candidatePassword) {
  return compare(candidatePassword, this.password);
});
