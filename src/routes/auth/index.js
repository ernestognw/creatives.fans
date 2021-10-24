import { Router } from 'express';
import { User, Session } from '@db/models';
import { cookie } from '@config/constants';
import { getFacebookUser } from '@connections/facebook';
import { getGoogleUser } from '@connections/google';
import { tokens, users } from './utils';

const auth = Router();

auth.get('/access', async (req, res) => {
  try {
    const refreshToken = req.cookies[cookie.names.refreshToken];

    const sessionExists = await Session.findOne({ refreshToken });

    if (!sessionExists) throw new Error('Invalid Token');

    const { userId } = tokens.refresh.validate(refreshToken);

    const user = await User.findOne({ _id: userId });

    const accessToken = tokens.access.get(user);

    return res.status(200).json({
      accessToken,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

auth.post('/login/google', async (req, res) => {
  try {
    const { googleIdToken, expires = true } = req.body;

    const payload = await getGoogleUser(googleIdToken);

    let user = await User.findOne({
      email: payload.email.toLowerCase(),
    });

    if (!user) {
      user = await users.buildOAuthUser({
        email: payload.email,
        profileImg: payload.picture,
        firstName: payload.given_name,
        lastName: payload.family_name,
      });
    }

    const { refreshToken, accessToken, session } = await tokens.refresh.set(req, res, {
      user,
      expires,
    });

    return res.status(200).json({
      refreshToken,
      accessToken,
      session,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

auth.post('/login/facebook', async (req, res) => {
  try {
    const { fbAccessToken, expires = true } = req.body;

    const fbUser = await getFacebookUser(fbAccessToken);

    let user = await User.findOne({
      'emails.email': fbUser.email.toLowerCase(),
    });

    if (!user) {
      user = await users.buildOAuthUser({
        email: fbUser.email,
        profileImg: fbUser.picture.data.url,
        firstName: fbUser.first_name,
        lastName: fbUser.last_name,
      });
    }

    const { refreshToken, accessToken, session } = await tokens.refresh.set(req, res, {
      user,
      expires,
    });

    return res.status(200).json({
      refreshToken,
      accessToken,
      session,
    });
  } catch (err) {
    throw res.status(500).json(err);
  }
});

auth.post('/logout', async (req, res) => {
  const sessionId = req.cookies[cookie.names.session];
  const refreshToken = req.cookies[cookie.names.refreshToken];

  try {
    await tokens.refresh.remove(res, refreshToken, sessionId);

    return res.status(200).send('OK');
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default auth;
