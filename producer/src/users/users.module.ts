import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailIsUniqueConstraint } from 'src/utils/pipes/email-is-unique.validator';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
