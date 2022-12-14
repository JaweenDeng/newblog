import { Controller, Get, Request, Query, Post, Body } from '@nestjs/common';
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

  @Get('/hotReply/detail')
  async getHotReplyDetail(@Query() query) {
    const article = await this.homeService.getHotPelyDetail(query.id)
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
  
  @Get('/getFirstComment')
  async getFirstComment(@Query() query) {
    const comment = await this.homeService.getFirstComment(query.id)
    if (comment) {
      return {
        code: 0,
        message: 'Success.',
        data:comment
      }
    } else {
      return {
        code: 1,
        message: '系统错误，请稍后再试!',
      }
    }
  }

  @Post('/setFirstCommnet')
  async setFirstCommnet(@Request() req, @Body() body) {
    const comment = await this.homeService.setFirstCommnet(req, body)
    if (comment) {
      return {
        code: 0,
        message: 'Success.',
      }
    } else {
      return {
        code: 1,
        message: '系统错误，请稍后再试!',
      }
    }
  } 

  @Post('/setSecordCommnet')
  async setSecordCommnet(@Request() req, @Body() body) {
    const comment = await this.homeService.setSecordCommnet(req, body)
    if (comment) {
      return {
        code: 0,
        message: 'Success.',
      }
    } else {
      return {
        code: 1,
        message: '系统错误，请稍后再试!',
      }
    }
  } 

  @Get('/getSecordComment')
  async getSecordComment(@Query() query) {
    const comment = await this.homeService.getSecordComment(query.articleId, query.parentId)
    if (comment) {
      return {
        code: 0,
        message: 'Success.',
        data:comment
      }
    } else {
      return {
        code: 1,
        message: '系统错误，请稍后再试!',
      }
    }
  }
}
