import { Controller, Get, Request, Query } from '@nestjs/common';
import { HomeService } from './home.service'
@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    ) {}
  
  @Get('/hotReply')
  async getHotReply(@Request() req, @Query() query) {
    const article =  await this.homeService.getHotPely(req, query)
    if (article) {
      return {
        code: 0,
        message: 'Success.',
        data:article
      }
    } else {
      return {
        code: 1,
        message: '系统错误，请稍后再试!',
      }
    }
  }
}
