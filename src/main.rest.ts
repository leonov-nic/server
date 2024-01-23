import 'reflect-metadata';
import { Container } from 'inversify';
import { createRestApplicationContainer } from './rest/index.js';
import { createFormContainer } from './shared/modules/form/form.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createVoterContainer } from './shared/modules/voter/index.js';
import { createAuthContainer } from './shared/modules/auth/index.js';

import { Component } from './shared/types/component.enum.js';
import { RestApplication } from './rest/rest.application.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createFormContainer(),
    createUserContainer(),
    createVoterContainer(),
    createAuthContainer(),
  );

  const app = appContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
