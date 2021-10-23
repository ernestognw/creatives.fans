import { verify } from 'jsonwebtoken';
import { secrets } from '@config/environment';

const context = async ({ req }) => {
  const { authorization } = req.headers;

  let accessToken;

  if (authorization) [, accessToken] = authorization.split('Bearer ');
  else throw new Error('GraphQL API is only accesible with an access token');

  // NOTE: We are not catching errors since access token should be renewed before getting here
  const { userId } = verify(accessToken, secrets.access);

  return { user: { id: userId } };
};

export default context;
