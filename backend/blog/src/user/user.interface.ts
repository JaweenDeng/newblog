/*
 * @Author: djw
 * @Description: 
 */
import { Document } from 'mongoose';

export interface User extends Document {
  readonly surname: string;
  readonly password: string;
  readonly email: string;
  readonly phone: string;
  readonly userId: string
}