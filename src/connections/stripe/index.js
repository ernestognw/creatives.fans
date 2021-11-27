import client from 'stripe';
import { stripe } from '@config/environment';

export default client(stripe.privateKey);
