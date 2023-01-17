/*
 * @Author: djw
 * @Description: 用户模块
 */
import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO, EditUserDTO, LoginDTO, RegisterDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ListArticleDTO } from '../article/article.dto';
interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) {}

  // 获取所有用户列表
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async findAll(@Request() req, @Body() body): Promise<UserResponse<any>> {
    const data = await this.userService.getUserList(req, body)
    if (data) {
      return {
        code: 0,
        message: 'Success.',
        data
      }
    } else {
      return {
        code: 1,
        message: '系统错误，请稍后再试!',
      }
    }
  }

  // 修改用户状态
  @UseGuards(AuthGuard('jwt'))
  @Post('updateUser')
  async updateUser(@Body() body): Promise<UserResponse<any>> {
    const data = await this.userService.updateUser(body)
    if (data) {
      return {
        code: 0,
        message: 'Success.',
        data
      }
    } else {
      return {
        code: 1,
        message: '系统错误，请稍后再试!',
      }
    }
  }
  // 删除用户
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteUser')
  async deleteUser(@Body() body): Promise<UserResponse<any>> {
    const data = await this.userService.deleteUser(body)
    if (data) {
      return {
        code: 0,
        message: 'Success.',
        data
      }
    } else {
      return {
        code: 1,
        message: '系统错误，请稍后再试!',
      }
    }
  }

  // GET /user/:_id
  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<UserResponse<User>> {
    return {
      code: 200,
      data: await this.userService.findOne(_id),
      message: 'Success.'
    };
  }

  // GET /findUser/userId
  @Get('/findUser/:userId')
  async findUser(@Param('userId') userId:string):Promise<UserResponse<User>> {
    const user = await this.userService.findUser(userId)
    return {
      code: 200,
      data: user[0],
      message: 'Success.'
    }
  }

  // POST /user
  @Post()
  async addOne(@Body() body: CreateUserDTO): Promise<UserResponse> {
    await this.userService.addOne(body);
    return {
      code: 200,
      message: 'Success.'
    };
  }

  // PUT /editUser/:userId
  @Post('/editUser/:userId')
  async editOne(
    @Param('userId') userId: string,
    @Body() body: EditUserDTO
  ): Promise<UserResponse> {
    await this.userService.editOne(userId, body);
    return {
      code: 200,
      message: 'Success.'
    };
  }

  // DELETE /user/:userId
  @Delete(':userId')
  async deleteOne(@Param('userId') userId: string): Promise<UserResponse> {
    await this.userService.deleteOne(userId);
    return {
      code: 200,
      message: 'Success.'
    };
  }

  //login: /user/login
  @Post('/login')
  async login(@Request() req, @Body() body: LoginDTO):Promise<UserResponse> {
    const token = await this.userService.login(body);
    if (token) {
      return {
        code: 0,
        message: 'Success',
        data:token
      }
    } else {
      return {
        code: 1,
        message: '登录失败!'
      }
    }
  }

  // register: /user/register
  @Post('/register')
  async register(@Body() body: RegisterDTO):Promise<UserResponse> {
    const user = await this.userService.register(body);
    if (user) {
      return {
        code: 0,
        message: 'Success',
      }
    } else {
      return {
        code: 1,
        message: '注册失败!'
      }
    }
  }

  //auth 判断是否登录
  @Post('getUserInfo')
  async getUserInfo(@Request() req) {
    const user = await this.userService.getUserInfo(req);
    return {
      code: 0,
      message: 'Success',
      data:user
    }
  }
}