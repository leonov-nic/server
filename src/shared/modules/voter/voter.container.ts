import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { Controller } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';

import { DefaultVoterService, VoterService } from './index.js';
import { VoterEntity, VoterModel } from './voter.entity.js';
import { VoterController } from './index.js';

export function createVoterContainer() {
  const voterContainer = new Container();
  voterContainer.bind<VoterService>(Component.VoterService).to(DefaultVoterService);
  voterContainer.bind<types.ModelType<VoterEntity>>(Component.VoterModel).toConstantValue(VoterModel);
  voterContainer.bind<Controller>(Component.VoterController).to(VoterController).inSingletonScope();
  return voterContainer;
}
