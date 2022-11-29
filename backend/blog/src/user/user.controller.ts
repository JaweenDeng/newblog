/*
 * @Author: djw
 * @Description: 用户模块
 */
import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO, EditUserDTO, LoginDTO, RegisterDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
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

  // GET /user/users
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async findAll(@Request() req): Promise<UserResponse<User[]>> {
    const userId = await this.userService.getToken(req)
    return {
      code: 0,
      data: await this.userService.findAll(),
      message: 'Success.'
    };
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
}