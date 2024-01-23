import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public direction: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar?: string;

  @Expose()
  public type: string;
}
