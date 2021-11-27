import { User, Support } from '@db/models';
import { defaultParams } from '@config/constants';
import { buildQuery, buildSearch } from '@graphql/resolvers/utils';

const userQueries = {
  users: async (_, { id, params = defaultParams, search = {}, sortBy, supports, supportedBy }) => {
    const query = {
      deleted: false,
      ...buildQuery(id, '_id'),
      ...buildSearch(search),
    };

    if (supports) {
      const $match = {
        deleted: false,
        ...buildQuery(supports, 'creative', { aggregation: true }),
      };

      // Better to do in an aggregation.
      // Otherwise ids should be calculated in a .map in node memory.
      // mongo atlas memory > server memory
      const results = await Support.aggregate([
        {
          // Get subconceptInstances
          $match,
        },
        {
          // Group them
          $group: {
            _id: null,
            ids: {
              $addToSet: { $toString: '$fan' },
            },
          },
        },
      ]);

      query._id = {
        ...(query._id ?? {}), // Respect old constructed query
        $in: [...(query._id?.$in ?? []), ...(results?.[0]?.ids ?? [])], // Respect old constructed $in
      };
    }

    if (supportedBy) {
      const $match = {
        deleted: false,
        ...buildQuery(supportedBy, 'fan', { aggregation: true }),
      };

      // Better to do in an aggregation.
      // Otherwise ids should be calculated in a .map in node memory.
      // mongo atlas memory > server memory
      const results = await Support.aggregate([
        {
          // Get subconceptInstances
          $match,
        },
        {
          // Group them
          $group: {
            _id: null,
            ids: {
              $addToSet: { $toString: '$creative' },
            },
          },
        },
      ]);

      query._id = {
        ...(query._id ?? {}), // Respect old constructed query
        $in: [...(query._id?.$in ?? []), ...(results?.[0]?.ids ?? [])], // Respect old constructed $in
      };
    }

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
