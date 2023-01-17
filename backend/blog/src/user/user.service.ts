/*
 * @Author: djw
 * @Description: 
 */
// user.service.ts
import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO, EditUserDTO, LoginDTO, RegisterDTO, statusDTO } from './user.dto';
import { User, IPayload } from './user.interface';
import * as bcrypt from 'bcrypt';
import { ListArticleDTO } from '../article/article.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 查找所有用户
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  // 查找单个用户
  async findOne(_id: string): Promise<User> {
    return await this.userModel.findById(_id);
  }
  // 根据userId 查询单个用户
  async findUser(userId:string):Promise<User[]> {
    return await this.userModel.find({userId:userId});
  }

  // 根据手机号码，查询单个用户
  async findPhoneUser(phone:string):Promise<User[]> {
    return await this.userModel.find({ phone });
  }

  // 添加单个用户
  async addOne(body: CreateUserDTO): Promise<void> {
    const users = await this.userModel.find();
    await this.userModel.create({...body, userId:users.length});
  }

  // 编辑单个用户
  async editOne(_id: string, body: EditUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(_id, body);
  }

  // 删除单个用户
  async deleteOne(_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(_id);
  }

  
  // 用户登录
  async login(body: LoginDTO): Promise<string|null> {
    const { phone, password } = body
    const user = await this.userModel.findOne({phone});
    if (user && (user.status === 1)) {
      const isPassword = await bcrypt.compare(password, user.password)
      if (isPassword) {
        return this.jwtService.sign({username: user.surname, sub: user.userId})
      }
    } 
    return null
  }
  
  // 用户注册
  async register(body: RegisterDTO):Promise<boolean> {
    const { password } = body;
    const hash = await bcrypt.hash(password, 10)
    const users = await this.userModel.find();
    const user = await this.userModel.create({...body, userId:users.length+1, password:hash, status:1});
    return user ? true : false
  }

  // 提取token
  async getToken(@Request() req):Promise<string>{
    const payload = this.jwtService.decode(req.get('Authorization').split(' ')[1])
    return payload.sub
  }
  
  // 返回登录信息
  async getUserInfo(@Request() req):Promise<User|null> {
    if (req.get('Authorization')) {
      const userId = await this.getToken(req)
      if (userId) {
        const user = await this.findUser(userId)
        return user.length ? user[0] : null
      }
    } 
    return null
  }

  // 用户列表
  async getUserList (@Request() req, body: ListArticleDTO): Promise<any> {
    const page = body.page ? body.page : 1
    const total = await this.userModel.find().count()
    const users = await this.userModel.find().skip(10*((page-1))).limit(body.pageSize || 10)
    return { entry:users, total}
  }

  // 用户状态修改
  async updateUser(body:statusDTO): Promise<boolean> {
    const user = await this.userModel.updateOne({userId:body.userId}, {status:body.status})
    return user ? true : false
  }

  // 用户删除
  async deleteUser(body:statusDTO): Promise<boolean> {
    const user = await this.userModel.deleteOne({userId:body.userId})
    return user ? true : false
  }
}