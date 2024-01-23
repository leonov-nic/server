import { inject, injectable} from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { FormEntity, FormService, CreateFormDto } from './index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';

@injectable()
export class DefaultFormService implements FormService {

  constructor (
    @inject(Component.Logger) private logger: Logger,
    @inject(Component.FormModel) private formModel: types.ModelType<FormEntity>
  ) {}

  public async create(dto: CreateFormDto): Promise<DocumentType<FormEntity>> {
    const result = await this.formModel.create(dto);
    this.logger.info(`Form created: ${result}`);
    return result;
  }

  public async find(): Promise<DocumentType<FormEntity>[] | null> {
    const result = await this.formModel.find({}).exec();
    return result;
  }

  public async updateById(id: string): Promise<DocumentType<FormEntity> | null> {
    // const result = await this.formModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    const result = await this.formModel.findByIdAndUpdate(id, [{'$set': {isActive : {'$not': '$isActive'}}}], { new: true }).exec();
    this.logger.info('Form update');
    return result;
  }

  public async findOne(): Promise<boolean> {
    return (await this.formModel.findOne({isActive: true})) !== null;
  }
}
