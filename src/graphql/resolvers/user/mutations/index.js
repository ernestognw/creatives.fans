import { User } from '@db/models';

const userMutations = {
  updateUserByToken: async (_, { user }, { user: { id } }) => {
    const userToSet = { ...user };

    if (userToSet.username) userToSet.username = userToSet.username.toLowerCase();

    return User.findOneAndUpdate({ _id: id }, { $set: { ...userToSet } }, { new: true });
  },
};

export default userMutations;
