import { Support } from '@db/models';
import { buildQuery, buildSearch } from '@graphql/resolvers/utils';
import { defaultParams } from '@config/constants';

const supportQueries = {
  supports: async (_, { id, params = defaultParams, search = {}, fan, creative, sortBy }) => {
    const query = {
      deleted: false,
      ...buildQuery(id, '_id'),
      ...buildQuery(fan, 'fan'),
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
  support: async (_, { id }) => Support.findOne({ _id: id }),
};

export default supportQueries;
