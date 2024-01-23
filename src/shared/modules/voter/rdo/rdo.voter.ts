import { Expose } from 'class-transformer';
// import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';

export class VoterRdo {
  @Expose()
  public family: string;

  @Expose()
  public name: string;

  @Expose()
  public surname: string;

  @Expose()
  public address: string;

  @Expose()
  public job: string;

  @Expose()
  public direction: string;

  @Expose()
  public phone: number;

  @Expose()
  public registration: number;

  @Expose()
  public isCurrent: boolean;

  // @Expose({ name: 'author'})
  // @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public id: string;
}
