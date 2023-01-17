/*
 * @Author: djw
 * @Description: ArticleController
 */
import { Controller, Get, Post, UseGuards, Request, Body, Query, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { ArticleService } from './article.service';
const fs  = require('fs');
const path = require('path');

@Controller('article')
export class ArticleController {
  constructor(
    private readonly userService: UserService,
    private readonly articleService: ArticleService
    ) {}
  // 导入
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async import(@Request() req, @UploadedFile() file) {
    const article = await this.articleService.importExcel(req, file.buffer)
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
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  async getArticleList(@Request() req, @Query() query) {
    const article = await this.articleService.getArticleList(req, query)
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

  // 文章新增
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async saveArticle(@Request() req, @Body() body) {
    const article = await this.articleService.addArticle(req, body)
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

  // 获取单个文章详情
  @UseGuards(AuthGuard('jwt'))
  @Get('detail/:id')
  async getDetail(@Param('id') id: string) {
    const article = await this.articleService.getArticleDetail(id)
    if (article && article.length) {
      return {
        code: 0,
        message: 'Success.',
        data:article[0]
      }
    } else {
      return {
        code: 1,
        message: '系统错误，请稍后再试!',
      }
    }
  }

  // 文章编辑
  @UseGuards(AuthGuard('jwt'))
  @Post('edit/:id')
  async editArticle(@Param('id') id: string, @Body() body) {
    const article = await this.articleService.updateArticle(id, body)
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

  // 文章删除
  @UseGuards(AuthGuard('jwt'))
  @Post('delete/:id')
  async deleteArticle(@Param('id') id: string) {
    const res = await this.articleService.deleteArticle(id)
    if (res) {
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

  // 评论列表
  @UseGuards(AuthGuard('jwt'))
  @Get('CommentList')
  async getCommentList(@Request() req, @Query() query) {
    const article = await this.articleService.getCommentList(req, query)
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

  // 评论删除
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteComment/:id')
  async deleteComment(@Param('id') id: string, @Body() body) {
    const res = await this.articleService.deleteComment(id, body)
    if (res) {
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

  // 评论下架
  @UseGuards(AuthGuard('jwt'))
  @Post('updateComment')
  async updateComment(@Body() body) {
    const res = await this.articleService.updateComment(body)
    if (res) {
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

  // 留言列表
  @UseGuards(AuthGuard('jwt'))
  @Get('getReplyList')
  async getReplyList(@Request() req, @Query() query) {
    const article = await this.articleService.getReplyList(req, query)
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

  // 留言删除
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteReply/:id')
  async deleteReply(@Param('id') id: string, @Body() body) {
    const res = await this.articleService.deleteReply(id, body)
    if (res) {
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

  // 留言下架
  @UseGuards(AuthGuard('jwt'))
  @Post('updateReply')
  async updateReply(@Body() body) {
    const res = await this.articleService.updateReply(body)
    if (res) {
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

}
