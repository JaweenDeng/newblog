import { Controller, Get, Request, Query, Post, Body } from '@nestjs/common';
import { HomeService } from './home.service'
@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    ) {}
    @Get('/getHomeIndex')
    async getHomeIndex(@Request() req){
      const article =  await this.homeService.getHomeIndex(req)
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

    @Get('/getArticleList')
    async getArticleList(@Request() req, @Query() query) {
      const article =  await this.homeService.getArticleList(req, query)
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


  @Get('/getArticleDetail')
  async getHotReplyDetail(@Query() query) {
    const article = await this.homeService.getArticleDetail(query.id)
    if (article) {
      return {
        code: 0,
        message: 'Success.',
        data:article.status ? article : {}
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

  @Get('/getFirstReply')
  async getFirstReply(@Query() query) {
    const comment = await this.homeService.getFirstReply(query.id)
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

  @Post('/setFirstReply')
  async setFirstReply(@Request() req, @Body() body) {
    const comment = await this.homeService.setFirstReply(req, body)
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

  @Post('/setSecordReply')
  async setSecordReply(@Request() req, @Body() body) {
    const comment = await this.homeService.setSecordReply(req, body)
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

  @Get('/getSecordReply')
  async getSecordReply(@Query() query) {
    const comment = await this.homeService.getSecordReply(query.parentId)
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
