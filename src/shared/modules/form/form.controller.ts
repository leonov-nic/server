import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { FormService, CreateFormDto, UpdateFormDto, FormRdo } from './index.js';
// import { Config, RestSchema } from '../../libs/config/index.js';
import { RequestParams, RequestBody} from '../../types/index.js';
import { PrivateRouteMiddleware } from '../../libs/rest/index.js';
import { ParamsDictionary } from 'express-serve-static-core';
type ParamFormId = {
  id: string;
} | ParamsDictionary;
export type UpdateFormRequest = Request<ParamFormId, unknown, UpdateFormDto>;


export type CreateFormRequest = Request<RequestParams, RequestBody, CreateFormDto>;

@injectable()
export class FormController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FormService) protected readonly formService: FormService,
    // @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for FormController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });

    this.addRoute({
      path: '/:id',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new PrivateRouteMiddleware()],
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
    });

  }

  public async index(_req: Request, res: Response): Promise<void> {
    // const session = _req.session;
    // console.log(session);
    const form = await this.formService.find();
    this.created(res, fillDTO(FormRdo, form));
  }

  public async update({params}: UpdateFormRequest, res: Response): Promise<void> {
    const form = await this.formService.updateById(params.id);
    this.created(res, fillDTO(FormRdo, form));
  }

  public async create({body}: CreateFormRequest, res: Response): Promise<void> {
    const result = await this.formService.create(body);
    this.created(res, fillDTO(CreateFormDto, result));
  }
}
