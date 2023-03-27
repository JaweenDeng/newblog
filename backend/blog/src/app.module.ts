import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { HomeModule } from './home/home.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/blog', { useNewUrlParser: true }),
    UserModule,
    AuthModule,
    ArticleModule,
    HomeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
