import express from 'express';
import { port } from '@config/environment';
import healthCheck from '@middlewares/health-check';
import graphqlServer from '@graphql';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { auth } from '@routes';

const app = express();

const corsConfig = {
  credentials: true,
  origin: true,
};

const startApp = async () => {
  await graphqlServer.start();

  // Middlewares
  app.use(express.json(), cors(corsConfig), cookieParser());
  graphqlServer.applyMiddleware({
    app,
    cors: corsConfig,
  });

  // Routes
  app.use('/auth', auth);
  app.use('/', healthCheck);

  await app.listen(port);
};

export default startApp;
