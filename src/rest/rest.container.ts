import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
// import { Socket, SocketConection } from '../shared/libs/socket/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import {DefaultExceptionFilter, ExceptionFilter, ValidationExceptionFilter, HttpErrorExceptionFilter } from '../shared/libs/rest/index.js';
import { PathTransformer } from '../shared/libs/rest/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  // restApplicationContainer.bind<Socket>(Component.Io).to(SocketConection).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(DefaultExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();

  return restApplicationContainer;
}
