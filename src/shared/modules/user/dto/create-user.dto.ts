import { Length, IsEmail, IsEnum, IsString } from 'class-validator';
import { PASSWORD_LENGTH } from '../index.js';
import { UserType } from '../../../types/index.js';

const CreateUserValidationMessage = {
  email: {
    invalidFormat: 'Mail must be a valid',
  },
  type: {
    invalidFormat: 'type must be a valid string',
  },
  direction: {
    invalidFormat: 'direction must be a valid string',
  },
  password: {
    invalidFormat: 'password must be from 6 to 12 characters',
  },
};

export class CreateUserDto {
  @IsEmail({}, {message: CreateUserValidationMessage.email.invalidFormat})
  public email: string;

  @IsEnum(UserType, { message: CreateUserValidationMessage.type.invalidFormat })
  public type: UserType;

  @IsString({message: CreateUserValidationMessage.direction.invalidFormat})
  public direction: string;

  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX, { message: CreateUserValidationMessage.password.invalidFormat })
  public password: string;
}
