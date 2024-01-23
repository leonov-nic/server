import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface VoterEntity extends defaultClasses.Base {}

@modelOptions({schemaOptions: {collection: 'voters'}})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class VoterEntity extends defaultClasses.TimeStamps {

  @prop({required: true, trim: true, minlength: [2, 'Min length for family is 2'], maxlength: [30, 'Max length for family is 30'] })
  public family: string;

  @prop({required: true, trim: true, minlength: [2, 'Min length for name is 2'], maxlength: [30, 'Max length for name is 30']})
  public name: string;

  @prop({required: true, trim: true, minlength: [2, 'Min length for surname is 2'], maxlength: [30, 'Max length for surname is 30']})
  public surname: string;

  @prop({required: true, trim: true, minlength: [3, 'Min length for address is 3'], maxlength: [100, 'Max length for address is 100']})
  public address: string;

  @prop({required: true, trim: true, minlength: [3, 'Min length for job is 3'], maxlength: [100, 'Max length for job is 100']})
  public job: string;

  @prop({required: true, trim: true})
  public direction: string;

  @prop({required: true, minlength: [11, 'Min length for phone is 11'], maxlength: [11, 'Max length for phone is 11']})
  public phone: string;

  @prop({required: true, unique: true, minlength: [9, 'Min length for registration is 9'], maxlength: [9, 'Max length for registration is 9']})
  public registration: string;

  @prop({default: true})
  public isCurrent: boolean;

  @prop({ref: UserEntity, _id: false})
  public author: Ref<UserEntity>;
}

export const VoterModel = getModelForClass(VoterEntity);
