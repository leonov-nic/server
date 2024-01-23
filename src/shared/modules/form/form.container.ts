import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { DefaultFormService, FormService, FormController, FormEntity, FormModel } from './index.js';
import { Component } from '../../types/index.js';
import { Controller } from '../../libs/rest/index.js';

export function createFormContainer() {
  const formContainer = new Container();
  formContainer.bind<FormService>(Component.FormService).to(DefaultFormService).inSingletonScope();
  formContainer.bind<types.ModelType<FormEntity>>(Component.FormModel).toConstantValue(FormModel);
  formContainer.bind<Controller>(Component.FormController).to(FormController).inSingletonScope();
  return formContainer;
}
