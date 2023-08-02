import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailExistePipe } from 'src/utils/pipes/email-is-exists.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern({ cmd: 'create' })
  create(@Payload() data: CreateUserDto, @Ctx() context: RmqContext) {
    console.log(data)
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return this.usersService.create(data);
  }

  @MessagePattern({ cmd: 'get-all' })
  getAll(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get-by-id' })
  getById(@Payload() data: any, @Ctx() context: RmqContext) {
    const { id } = data;
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return this.usersService.getById(id);
  }

  @MessagePattern({ cmd: 'get-by-email' })
  async getByEmail(@Payload() data: any, @Ctx() context: RmqContext): Promise<any> {
    const { email } = data;
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    const users = await this.usersService.getByEmail(email);
    return users
  }

  @MessagePattern({ cmd: 'update' })
  update(@Payload() data: any, @Ctx() context: RmqContext) {
    const { id, userData } = data;
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return this.usersService.update(id, userData);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload() data: any, @Ctx() context: RmqContext) {
    const { id } = data;
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return this.usersService.delete(id);
  }

}
