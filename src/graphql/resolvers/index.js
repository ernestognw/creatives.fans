import { userQueries, userMutations, userFields } from './user';
import { supportQueries, supportMutations, supportFields } from './support';
import { AWSQueries } from './aws';
import { stripeQueries, stripeMutations, stripeFields } from './stripe';

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
    ...stripeMutations,
  },
  ...userFields,
  ...supportFields,
  ...stripeFields,
};

export default resolvers;
