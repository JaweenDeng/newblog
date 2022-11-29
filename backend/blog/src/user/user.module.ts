import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { userSchema } from './user.schema';
import { UserService } from './user.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import config from '../config/common.config'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: userSchema }]),
    JwtModule.register({
      secret: config.JwtSecret,
      signOptions: { expiresIn: '86400s' },
    }),
    // 引入并配置PassportModule
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService] 
})
export class UserModule {}
