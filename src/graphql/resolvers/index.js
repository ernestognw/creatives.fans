import { userQueries, userMutations, userFields } from './user';
import { supportQueries, supportMutations, supportFields } from './support';

const resolvers = {
  Query: {
    ...userQueries,
    ...supportQueries,
  },
  Mutation: {
    ...userMutations,
    ...supportMutations,
  },
  ...userFields,
  ...supportFields,
};

export default resolvers;
