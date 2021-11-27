import { userQueries, userMutations, userFields } from './user';
import { supportQueries, supportMutations, supportFields } from './support';
import { AWSQueries } from './aws';

const resolvers = {
  Query: {
    ...userQueries,
    ...supportQueries,
    ...AWSQueries,
  },
  Mutation: {
    ...userMutations,
    ...supportMutations,
  },
  ...userFields,
  ...supportFields,
};

export default resolvers;
