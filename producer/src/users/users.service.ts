import { BadRequestException, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { catchError, lastValueFrom, Observable, throwError, timeout } from 'rxjs';
import { exceptionsMessages } from 'src/utils/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { cryptPassword } from 'src/utils/crypt-password';


@Injectable()
export class UsersService {
  logger: any;
  rabbitMQWrapper: any;
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
  ) { }


  async create(createUserDto: CreateUserDto) {
    const pattern = { cmd: 'create' };
    const { password } = createUserDto
    const crypted = await cryptPassword(password)
    createUserDto.password = crypted
    return this.client.send(pattern, createUserDto)
      .pipe(catchError(error => throwError(() => new RpcException(error.response))))
  }

  getAll(): Observable<any> {
    const pattern = { cmd: 'get-all' };
    return this.client.send(pattern, {})
  }

  getById(id: string): Observable<any> {
    const pattern = { cmd: 'get-by-id' };
    return this.client.send(pattern, { id })
      .pipe(catchError(error => throwError(() => new RpcException(error.response))))

  }

  async getByEmail(email: string): Promise<any> {
    const pattern = { cmd: 'get-by-email' };
    return await this.client.send(pattern, { email })
      .pipe(catchError(error => throwError(() => new RpcException(error.response))))
  }

  update(id: string, updateUserDto: UpdateUserDto): Observable<any> {
    const pattern = { cmd: 'update' };
    return this.client.send(pattern, { id, userData: updateUserDto })
  }

  delete(userId: string): Observable<any> {
    const pattern = { cmd: 'delete' };
    return this.client.send(pattern, { id: userId })
  }

}
