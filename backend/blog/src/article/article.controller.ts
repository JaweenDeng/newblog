/*
 * @Author: djw
 * @Description: ArticleController
 */
import { Controller, Get, Post, UseGuards, Request, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ArticleService } from './article.service'
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
const fs  = require('fs');
const path = require('path');

@Controller('article')
export class ArticleController {
  constructor(
    private readonly userService: UserService,
    private readonly articleService: ArticleService
    ) {}
  
  // 上传接口
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file,@Body() body) {
    const writeImage = fs.createWriteStream(path.join(__dirname, '..',  '../public/upload', `${file.originalname}`))
    writeImage.write(file.buffer)  
    return {
      code: 0,
      message: 'Success.',
      data:`/static/upload/${file.originalname}`
    };
  }

  // 获取当前用户创建文章列表
  @Get('list')
  async getArticleList(@Request() req, @Body() body) {
    const article = await this.articleService.getArticleList(req, body)
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

  // 文章保存
  @Post('/save')
  async saveArticle(@Request() req, @Body() body) {
    const article = await this.articleService.saveArticle(req, body)
    if (article) {
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


  //富文本编辑器上传图片
  @Post('/common/upload')
  @UseInterceptors(FileInterceptor('file'))
  async commonUpload(@UploadedFile() file,@Body() body) {
    const writeImage = fs.createWriteStream(path.join(__dirname, '..',  '../public/upload', `${file.originalname}`))
    writeImage.write(file.buffer)  
    return {
      "errno": 0, // 注意：值是数字，不能是字符串
      "data": {
        "url": `http://localhost:3001/static/upload/${file.originalname}`, // 图片 src ，必须
        "alt": "alt", // 图片描述文字，非必须
        "href": "href" // 图片的链接，非必须
      }
    }
  }
}
