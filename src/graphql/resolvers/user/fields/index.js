import { Support } from '@db/models';
import { defaultParams } from '@config/constants';
import { buildQuery, buildSearch } from '@graphql/resolvers/utils';

const userFields = {
  User: {
    supportsGiven: async (
      { id: userId },
      { id, params = defaultParams, search = {}, creative, sortBy }
    ) => {
      const query = {
        deleted: false,
        fan: userId,
        ...buildQuery(id, '_id'),
        ...buildQuery(creative, 'creative'),
        ...buildSearch(search),
      };

      return {
        results: async () => {
          const { page, pageSize } = params;
          const supportsPromise = Support.find(query)
            .skip(pageSize * (page - 1))
            .limit(pageSize);

          if (sortBy) {
            const { field, order } = sortBy;
            supportsPromise.sort({ [field]: order });
          }

          return supportsPromise;
        },
        count: () => Support.countDocuments(query),
        params,
      };
    },
    supportsReceived: async (
      { id: userId },
      { id, params = defaultParams, search = {}, fan, sortBy }
    ) => {
      const query = {
        deleted: false,
        creative: userId,
        ...buildQuery(id, '_id'),
        ...buildQuery(fan, 'fan'),
        ...buildSearch(search),
      };

      return {
        results: async () => {
          const { page, pageSize } = params;
          const supportsPromise = Support.find(query)
            .skip(pageSize * (page - 1))
            .limit(pageSize);

          if (sortBy) {
            const { field, order } = sortBy;
            supportsPromise.sort({ [field]: order });
          }

          return supportsPromise;
        },
        count: () => Support.countDocuments(query),
        params,
      };
    },
  },
};

export default userFields;
