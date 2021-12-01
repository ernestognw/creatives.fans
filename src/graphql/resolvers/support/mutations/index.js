import { Support, User } from '@db/models';
import stripe from '@connections/stripe';

const supportMutations = {
  createSupport: async (_, { support: supportArg }, { user: { id: fan } }) => {
    const support = { ...supportArg };
    if (support.paymentMethod) {
      if (!support.amount) throw new Error('Amount required when payment method is provided');

      const paymentMethod = await stripe.paymentMethods.retrieve(support.paymentMethod);

      const user = await User.findOne({
        _id: fan,
        stripeCustomerId: paymentMethod.customer,
      });

      if (!user) throw new Error('Payment method is not associated to user');

      await stripe.paymentIntents.create({
        amount: support.amount * 100,
        currency: 'mxn',
        customer: paymentMethod.customer,
        payment_method: paymentMethod.id,
        off_session: true,
        confirm: true,
      });

      delete support.paymentMethod;
    } else if (support.amount) throw new Error('Payment method required when amount is provided');

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
