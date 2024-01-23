import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  // @Expose()
  // public id: string;

  @Expose()
  public type: string;

  @Expose()
  public direction: string;

  @Expose()
  public avatar: string;
}
