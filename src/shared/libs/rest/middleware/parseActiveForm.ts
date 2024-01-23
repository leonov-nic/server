import { NextFunction, Request, Response } from 'express';
import { Middleware } from '../index.js';
import { HttpError } from '../index.js';
import { StatusCodes } from 'http-status-codes';
import { FormaIsActive } from './activeForm.interface.js';

export class ParseActiveFormMiddleware implements Middleware {
  constructor (
    private readonly service: FormaIsActive,
    private readonly entityName: string,
  ) {}

  public async execute(_req: Request, _res: Response, next: NextFunction): Promise<void> {
    const isExist = await this.service.findOne();
    console.log(isExist);
    if (! isExist) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `${this.entityName} is blocked`,
        'ParseActiveFormMiddleware'
      );
    }
    next();
  }
}
