import express from 'express';
import { Setup } from './app.setup';


class App extends Setup {
  constructor() {
    super(express());

    this.buildConfigurations();
  }

  buildConfigurations() {
    this.useApplicationMiddlewares();

    this.useCorsSecurityconfig();

    this.setGlobalRoutesPrefix('/api/v1');

    this.setTestApplicationRoutes();

    this.useSwaggerDocumentation();

    this.catchUnknownRoutes();
  }

  run() {
    this.start();
  }
}
new App().run();
