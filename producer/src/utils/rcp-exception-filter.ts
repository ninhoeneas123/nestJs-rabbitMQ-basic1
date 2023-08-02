import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    console.log(error);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = error?.message || 'Internal server error';
    response
      .status(statusCode)
      .json({
        code: statusCode,
        message: errorMessage
      });
  }
}