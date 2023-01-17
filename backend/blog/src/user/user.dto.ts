/*
 * @Author: djw
 * @Description: 
 */
export class CreateUserDTO {
  readonly surname: string;
  readonly password: string;
  readonly email: string;
  readonly phone: string;
}

export class EditUserDTO {
  readonly surname: string;
  readonly password: string;
  readonly email: string;
  readonly phone: string;
}

export class LoginDTO {
  readonly phone: string;
  readonly password: string;
}

export class RegisterDTO {
  readonly surname: string;
  readonly password: string;
  readonly email: string;
  readonly phone: string;
}

export class statusDTO {
  readonly status: number;
  readonly userId: number;
}