import { User } from '@db/models';
import stripe from '@connections/stripe';

const stripeMutations = {
  stripeDetachPaymentMethod: async (_, { id }, { user: { id: userId } }) => {
    const paymentMethod = await stripe.paymentMethods.retrieve(id);

    const user = await User.findOne({
      _id: userId,
      stripeCustomerId: paymentMethod.customer,
    });

    if (!user) throw new Error('Payment method is not associated to user');

    await stripe.paymentMethods.detach(id);

    return true;
  },
};

export default stripeMutations;
