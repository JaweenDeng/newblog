import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '../user/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly jwtService: JwtService
  ){}

  // 验证手机密码
  async validateUser(phone:string, password:string):Promise<User|null>{
    const user = this.userService.findPhoneUser(phone)
    if (user[0] && user[0].password === password) {
      return user[0];
    }
    return null
  }

  // 登录返回token
  async login(user: any) {
    console.log(user.phone, 'user')
    const payload = { phone: user.phone, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 测试验证手机
  async validPhone(phone:string, password:string) :Promise<boolean>{
    return true
  }
}
