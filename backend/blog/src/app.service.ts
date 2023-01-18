import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    const htmls = 'hellow world!'
    return htmls;
  }
}
