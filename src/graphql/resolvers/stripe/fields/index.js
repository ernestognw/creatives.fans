import stripe from '@connections/stripe';

const stripeFields = {
  StripeCustomer: {
    paymentMethods: async ({ id }) => {
      const { data } = await stripe.paymentMethods.list({
        customer: id,
        type: 'card',
      });

      return data;
    },
  },
  StripeCard: {
    id: ({ fingerprint }) => fingerprint,
    expirationMonth: ({ exp_month }) => exp_month,
    expirationYear: ({ exp_year }) => exp_year,
  },
};

export default stripeFields;
