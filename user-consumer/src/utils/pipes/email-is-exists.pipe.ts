import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UsersService } from 'src/users/users.service';
import { exceptionMessages } from '../exceptions-messages';

@Injectable()
export class EmailExistePipe implements PipeTransform {
    constructor(private usersService: UsersService) { }

    async transform(email: any) {
        const emailIsUnique = await this.usersService.getByEmail(email.email)
        if (emailIsUnique) {
            throw new RpcException(
                new BadRequestException(exceptionMessages.EMAIL_ALREADY_EXISTS)
            );
        }
    }
}