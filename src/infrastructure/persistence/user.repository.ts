import { Injectable } from '@nestjs/common';
import { User as UserModel } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { Repository } from '../../domain/repositories/repository';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository implements Repository<UserEntity> {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async create(userEntity: UserEntity): Promise<UserEntity> {
    const newUser = new this.userModel(userEntity);
    const userCreated = await newUser.save();
    return new UserEntity(userCreated._id.toString(), userCreated.username, '');
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().exec();
    return users.map(
      (user) => new UserEntity(user._id.toString(), user.username, ''),
    );
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) return null;
    return new UserEntity(user._id.toString(), user.username, '');
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) return null;
    return new UserEntity(user._id.toString(), user.username, '');
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<{ passwordValid: boolean; user: UserEntity }> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) return null;
    const isCorrect = await user.comparePassword(password);
    return {
      passwordValid: isCorrect,
      user: new UserEntity(user._id.toString(), user.username, ''),
    };
  }

  async update(id: string, model: Partial<UserEntity>): Promise<void> {
    await this.userModel.updateOne({ _id: id }, model);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
}
