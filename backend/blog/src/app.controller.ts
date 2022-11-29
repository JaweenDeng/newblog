import { Controller, Get, Post, Request, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth/auth.service'
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  //测试路由
  // @UseGuards(AuthGuard('local'))
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //登录接口
  // @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
