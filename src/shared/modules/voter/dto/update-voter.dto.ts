import { IsOptional} from 'class-validator';
import {User } from '../../../types/index.js';

export class UpdateVoterDto {
  // @IsBoolean({ message: CreateVoterValidationMessage.isCurrent.invalidFormat })
  public isCurrent?: boolean;

  @IsOptional()
  public author?: User;

}
