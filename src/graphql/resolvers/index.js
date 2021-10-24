import { userQueries, userMutations, userFields } from './user';

const resolvers = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...userMutations,
  },
  ...userFields,
};

export default resolvers;
