import { DocumentType } from '@typegoose/typegoose';
import { FormEntity } from './form.entity.js';
import { CreateFormDto } from './index.js';

export interface FormService {
  create(dto: CreateFormDto): Promise<DocumentType<FormEntity>>;
  find(): Promise<DocumentType<FormEntity>[] | null>;
  updateById(id: string): Promise<DocumentType<FormEntity> | null>;
  findOne(): Promise<boolean>;
}
