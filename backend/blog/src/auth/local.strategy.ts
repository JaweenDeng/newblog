/*
 * @Author: djw
 * @Description: 
 */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(phone: string, password: string): Promise<any> {
    // const user = await this.authService.validPhone(phone, password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    console.log('test')
    return {phone: 'string', password: 'string'}
  }
}
