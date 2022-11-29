/*
 * @Author: djw
 * @Description: 
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from '../config/common.config'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JwtSecret,
      passReqToCallback: true
    });
  }

  async validate(payload: any) {
    console.log(payload, 'payload')
    return { userId: payload.sub, username: payload.username };
  }
}