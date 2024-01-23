import { IsBoolean } from 'class-validator';

const CreateFormValidationMessage = {
  form: {
    invalidFormat: 'It is must be a valid',
  },
};

export class CreateFormDto {
  @IsBoolean({message: CreateFormValidationMessage.form.invalidFormat})
  public isActive: boolean;
}
