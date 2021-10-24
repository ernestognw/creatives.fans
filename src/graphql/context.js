import { verify } from 'jsonwebtoken';
import { secrets } from '@config/environment';

const context = async ({ req }) => {
  const { authorization } = req.headers;

  let accessToken;
  let userId;

  if (authorization) {
    [, accessToken] = authorization.split('Bearer ');

    // NOTE: We are not catching errors since access token should be renewed before getting here
    ({ userId } = verify(accessToken, secrets.access));
  }

  return { user: { id: userId } };
};

export default context;
