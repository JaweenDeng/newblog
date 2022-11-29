import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {

  @UseGuards(AuthGuard('local'))
  @Post('/user')
  getUser(@Request() req, @Body() body) {
    return 'hello word';
  }
}
