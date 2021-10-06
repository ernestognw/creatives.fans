import { port } from '@config/environment';
import { connectDB } from '@db/scripts';
import startApp from './app';

const start = async () => {
  try {
    await connectDB();
    console.info('🔥  Connected to DB');
    await startApp();
    console.info(`🚀  GraphQL server running at port: ${port}`);
  } catch (err) {
    console.info('Not able to run GraphQL server', err);
  }
};

start();
