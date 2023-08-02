import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    RequestTimeoutException,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError, timeout } from 'rxjs/operators';
  import { RpcException } from '@nestjs/microservices';
  
  @Injectable()
  export class RpcErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError((error) => {
          if (error instanceof RpcException || error instanceof RequestTimeoutException) {
            return throwError(() => error);
          } else if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) {
            return throwError(() => new RpcException('Recurso não encontrado'));
          } else {
            return throwError(() => new RpcException(error.response));
          }
        }),
        timeout(+process.env.TIME_OUT_RABBITMQ),
        catchError(() => {
          throw new RequestTimeoutException("Timeout for operation.");
        }),
      );
    }
  }
  