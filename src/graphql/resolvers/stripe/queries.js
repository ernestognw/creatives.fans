import { User } from '@db/models';
import stripe from '@connections/stripe';

const stripeQueries = {
  setupIntentByToken: async (_, __, { user: { id } }) => {
    const user = await User.findOne({ _id: id });

    if (!user.stripeCustomerId) {
      const { id: stripeCustomerId } = await stripe.customers.create();
      user.stripeCustomerId = stripeCustomerId;
      await user.save();
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: user.stripeCustomerId,
      payment_method_types: ['card'],
    });

    return {
      clientSecret: setupIntent.client_secret,
    };
  },
};

export default stripeQueries;
