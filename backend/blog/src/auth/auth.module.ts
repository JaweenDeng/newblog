import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import config from '../config/common.config'
@Module({
  imports:[ 
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config.JwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ],
  controllers: [AuthController],
  exports:[
    AuthService
  ]
})
export class AuthModule {}
