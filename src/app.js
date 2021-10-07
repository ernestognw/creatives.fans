import express from 'express';
import { port } from '@config/environment';
import healthCheck from '@middlewares/health-check';
import graphqlServer from '@graphql';
import { auth } from '@routes';

const app = express();

const startApp = async () => {
  await graphqlServer.start();

  // Middlewares
  graphqlServer.applyMiddleware({
    app,
  });

  // Routes
  app.use('/auth', auth);
  app.use('/', healthCheck);

  await app.listen(port);
};

export default startApp;
