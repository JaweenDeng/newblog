/*
 * @Author: djw
 * @Description: 异常过滤器
 */
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();   // 获取请求上下文
    const response = ctx.getResponse(); // 在请求上下文中获取 response 对象
    const request = ctx.getRequest();   // 在请求上下文中获取 request 对象
    const status = exception.getStatus();   // 获取异常的状态码
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}