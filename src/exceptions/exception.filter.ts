import type {
  ArgumentsHost,
  ExceptionFilter,
  LoggerService,
} from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();
    let status;
    let errorObject: { message: string };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorObject = { message: exception.getResponse() as string };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorObject = {
        message: exception.message,
      };
    }

    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      ...(status >= 500 ? [] : errorObject),
    };

    this.logMessage(request, errorObject, status, exception);

    response.status(status).json(responseData);
  }

  private logMessage(
    request: any,
    message: any,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status}  message=${
          message.message ? message.message : null
        }`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} message=${
          message.message ? message.message : null
        }`,
      );
    }
  }
}
