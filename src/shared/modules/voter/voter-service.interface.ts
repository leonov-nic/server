import { DocumentType } from '@typegoose/typegoose';
import { VoterEntity } from './index.js';

import { CreateVoterDto } from './index.js';
import { DocumentExists } from '../../libs/rest/index.js';

export interface VoterService extends DocumentExists {
  find(): Promise<DocumentType<VoterEntity>[] | null>;
  create(dto: CreateVoterDto): Promise<DocumentType<VoterEntity>>;

  deleteById(voterId: string): Promise<DocumentType<VoterEntity> | null>;

  getByDirection(direction: string, query?: number): Promise<DocumentType<VoterEntity>[] | null>;
  updateActiveVoters(): Promise<number>;
  exists(id: string): Promise<boolean>;

  // incCommentCount(id: string): Promise<DocumentType<VoterEntity> | null>;
}
