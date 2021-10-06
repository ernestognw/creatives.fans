import { port } from '@config/environment';
import { connectDB } from '@db/scripts';
import { db, api } from '@config/loggers';
import startApp from './app';

const start = async () => {
  try {
    db.await('Connecting to database');
    await connectDB();
    db.success('🔥  Connected to DB');

    await startApp();
    api.success(`🚀  GraphQL server running at port: ${port}`);
  } catch {
    db.error('Failed to connect to DB');
    api.error('Not able to run GraphQL server');
  }
};

start();
