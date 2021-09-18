import { ApolloServer } from 'apollo-server-express';
import schema from './schema';

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
});

export default apolloServer;
