import { Support } from '@db/models';

const supportMutations = {
  createSupport: async (_, { support }, { user: { id: fan } }) => {
    const newSupport = new Support({
      ...support,
      fan,
    });

    const savedSupport = await newSupport.save();

    return savedSupport;
  },
  updateSupport: async (_, { id, support }, { user: { id: user } }) => {
    const supportRecord = await Support.findOne({ _id: id });

    if (supportRecord.fan !== user)
      throw new Error('Unauthorized: You are not the owner of this support');

    return Support.findOneAndUpdate({ _id: id }, { $set: { ...support } }, { new: true });
  },
};

export default supportMutations;
