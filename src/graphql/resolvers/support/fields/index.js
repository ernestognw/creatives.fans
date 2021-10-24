import { User } from '../../../../db/models';

const supportFields = {
  Support: {
    fan: async ({ fan }) => User.findOne({ _id: fan }),
    creative: async ({ creative }) => User.findOne({ _id: creative }),
  },
};

export default supportFields;
