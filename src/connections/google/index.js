import { OAuth2Client } from 'google-auth-library';
import { google } from '@config/environment';

const { clientId } = google;
const client = new OAuth2Client(clientId);

const getGoogleUser = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
  });

  const payload = ticket.getPayload();

  return payload;
};

export { getGoogleUser };
