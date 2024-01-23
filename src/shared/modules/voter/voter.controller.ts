import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  HttpMethod,
  ValidateObjectIdMiddleware,
  ValidateDtoMiddleware,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware,
} from '../../libs/rest/index.js';
import { ParseActiveFormMiddleware } from '../../libs/rest/middleware/parseActiveForm.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { VoterService, CreateVoterDto, VoterRdo, UpdateVoterDto } from './index.js';
import { FormService } from '../form/form-service.interface.js';
import { RequestParams, RequestBody} from '../../types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { ParamsDictionary } from 'express-serve-static-core';

export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateVoterDto>;
export type ParamVoterId = {
  id: string;
} | ParamsDictionary;

export type ParamDirection = {
  direction: string;
} | ParamsDictionary;

export type RequestQuery = {
  limit?: number;
}

@injectable()
export class VoterController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.VoterService) protected readonly voterService: VoterService,
    @inject(Component.FormService) protected readonly formService: FormService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');


    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });

    this.addRoute({ path: '/:direction', method: HttpMethod.Get, handler: this.showVoterByDirection });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware,
        new ValidateDtoMiddleware(CreateVoterDto),
        new ParseActiveFormMiddleware(this.formService, 'Form')
      ],
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware,
        new ValidateObjectIdMiddleware('id'),
        new DocumentExistsMiddleware(this.voterService, 'Voter', 'id'),
        // new ValidateAuthorsOfferMiddleware(this.voterService, 'Offer', 'id')
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Put,
      handler: this.updateVoters,
      middlewares: [
        new PrivateRouteMiddleware,
        new ValidateDtoMiddleware(UpdateVoterDto),
        // new ValidateAuthorsOfferMiddleware(this.voterService, 'Offer', 'id')
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const voters = await this.voterService.find();
    this.created(res, fillDTO(VoterRdo, voters));
  }

  // public async create({ body, tokenPayload }: Request, res: Response): Promise<void> {
  //   const voter = await this.voterService.create({...body, author: tokenPayload.id});
  //   this.created(res, fillDTO(VoterRdo, voter));
  //   this.logger.info(`Created offer ${voter.family}`);
  // }

  public async create({ body, tokenPayload }: Request, res: Response): Promise<void> {
    const voter = await this.voterService.create({...body, author: tokenPayload.id});
    this.created(res, fillDTO(VoterRdo, voter));
    this.logger.info(`Created voter ${voter.family}`);
  }

  public async delete({ params }: Request<ParamVoterId>, res: Response): Promise<void> {
    const deletedVoter = await this.voterService.deleteById(params.id);
    this.ok(res, fillDTO(VoterRdo, deletedVoter));
    // this.noContent(res, deletedVoter);
    this.logger.info('Voter is deleted');
  }

  public async showVoterByDirection({params, query}: Request<ParamDirection, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    const votersByDirection = await this.voterService.getByDirection(params.direction, query.limit);
    this.ok(res, fillDTO(VoterRdo, votersByDirection));
  }

  public async updateVoters(_req: Request, res: Response): Promise<void> {
    const updatedVoters = await this.voterService.updateActiveVoters();
    // this.noContent(res, updatedVoters);
    this.created(res, fillDTO(VoterRdo, updatedVoters));
    // this.ok(res, fillDTO(VoterRdo, updatedVoters));
    this.logger.info('Voters is updated');
  }
}
