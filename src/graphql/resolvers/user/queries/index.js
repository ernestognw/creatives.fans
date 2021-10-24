import { User } from '@db/models';
import { defaultParams } from '@config/constants';
import { buildQuery, buildSearch } from '@graphql/resolvers/utils';

const userQueries = {
  users: async (_, { id, search = {}, params = defaultParams, sortBy }) => {
    const query = {
      deleted: false,
      ...buildQuery(id, '_id'),
      ...buildSearch(search),
    };

    return {
      results: async () => {
        const { page, pageSize } = params;
        const usersPromise = User.find(query)
          .skip(pageSize * (page - 1))
          .limit(pageSize);

        if (sortBy) {
          const { field, order } = sortBy;
          usersPromise.sort({ [field]: order });
        }

        return usersPromise;
      },
      count: () => User.countDocuments(query),
      params,
    };
  },
  userByToken: async (_, __, { user: { id } }) => User.findOne({ _id: id }),
  user: async (_, { id, username }) => {
    const query = {};

    if (id) {
      query._id = id;
    } else if (username) {
      query.username = username;
    }

    return User.findOne(query);
  },
};

export default userQueries;
