import { CreateVoterValidationMessage } from '../voter-validation-message.js';
import { MaxLength, MinLength, IsString, IsBoolean, Matches, IsNumberString, Length } from 'class-validator';

export class CreateVoterDto {
  @IsString({message: CreateVoterValidationMessage.family.invalidFormat})
  @MinLength(2, {message: CreateVoterValidationMessage.family.minLength})
  @MaxLength(30, {message: CreateVoterValidationMessage.family.maxLength})
  public family: string;

  @Matches(/^[А-ЯЁ][а-яё]+$/, { message: 'В имени должны быть только русские буквы, первая буква заглавная' })
  @IsString({message: CreateVoterValidationMessage.name.invalidFormat})
  @MinLength(2, {message: CreateVoterValidationMessage.name.minLength})
  @MaxLength(30, {message: CreateVoterValidationMessage.name.maxLength})
  public name: string;

  @IsString({message: CreateVoterValidationMessage.surname.invalidFormat})
  @MinLength(2, {message: CreateVoterValidationMessage.surname.minLength})
  @MaxLength(30, {message: CreateVoterValidationMessage.surname.maxLength})
  public surname: string;

  @IsString({message: CreateVoterValidationMessage.address.invalidFormat})
  @MinLength(3, {message: CreateVoterValidationMessage.address.minLength})
  @MaxLength(100, {message: CreateVoterValidationMessage.address.maxLength})
  public address: string;

  @IsString({message: CreateVoterValidationMessage.job.invalidFormat})
  @MinLength(3, {message: CreateVoterValidationMessage.job.minLength})
  @MaxLength(100, {message: CreateVoterValidationMessage.job.maxLength})
  public job: string;

  @IsString({message: CreateVoterValidationMessage.direction.invalidFormat})
  public direction: string;

  @Matches(/^7\d{10}$/, { message: 'Номер должен начинаться с цифры 7' })
  @IsNumberString(undefined, { message: CreateVoterValidationMessage.phone.invalidFormat })
  @Length(11, 11)
  public phone: number;

  @IsNumberString({}, { message: CreateVoterValidationMessage.registration.invalidFormat })
  @Length(9, 9, { message: CreateVoterValidationMessage.registration.minLength })
  public registration: number;

  @IsBoolean({ message: CreateVoterValidationMessage.isCurrent.invalidFormat })
  public isCurrent: boolean;

  // @IsMongoId({ message: CreateVoterValidationMessage.author.invalidId })
  public author: string;
}
