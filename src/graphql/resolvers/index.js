import { userQueries, userMutations, userFields } from './user';
import { supportQueries, supportMutations, supportFields } from './support';
import { AWSQueries } from './aws';
import { stripeQueries } from './stripe';

const resolvers = {
  Query: {
    ...userQueries,
    ...supportQueries,
    ...AWSQueries,
    ...stripeQueries,
  },
  Mutation: {
    ...userMutations,
    ...supportMutations,
  },
  ...userFields,
  ...supportFields,
};

export default resolvers;
