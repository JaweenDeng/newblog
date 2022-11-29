/*
 * @Author: djw
 * @Description: ArticleController
 */
import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly userService: UserService,
    ) {}
  
  @Post('upload')
  async upload() {
    return 'hello word111'
  }

  @Get('/post')
  async addArticle(@Request() req, @Body() body) {
    const userId = await this.userService.getToken(req)
    console.log(userId)
    return 'hello word111';
  }

  //编辑器上传图片
  @Post('/common/upload')
  async commonUpload() {
    return {
      "errno": 0, // 注意：值是数字，不能是字符串
      "data": {
        "url": "https://static.ais.cn/resource/banner/2022/11/330221118112654948.png", // 图片 src ，必须
        "alt": "yyy", // 图片描述文字，非必须
        "href": "zzz" // 图片的链接，非必须
      }
    }
  }
}
