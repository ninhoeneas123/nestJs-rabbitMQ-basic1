import { BadRequestException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { exceptionMessages } from 'src/utils/exceptions-messages';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<String> {
    const dataUser = createUserDto
    await this.userModel.create(dataUser);
    return "User created successfully"
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new RpcException(
        new BadRequestException(exceptionMessages.USER_NOT_FOUND,)
      );
    }
    return user
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new RpcException(
        new BadRequestException(exceptionMessages.USER_NOT_FOUND,)
      );
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<String> {
    await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return "User updated successfully"
  }

  async delete(id: string): Promise<String> {
    await this.userModel.findByIdAndDelete(id);
    return "User deleted successfully"
  }

}
