import { Expose } from 'class-transformer';
// import { Expose, Type } from 'class-transformer';

export class FormRdo {
  @Expose()
  public isActive: boolean;

  @Expose()
  public updatedAt: string;

  @Expose({name: 'id'})
  public _id: string;
}
