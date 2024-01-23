import { Form } from '../../types/index.js';
import { getModelForClass, prop, defaultClasses, modelOptions } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FormEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'form', timestamps: true,} })

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FormEntity extends defaultClasses.TimeStamps implements Form {
  @prop({required: true})
  public isActive: boolean;
}

export const FormModel = getModelForClass(FormEntity);
