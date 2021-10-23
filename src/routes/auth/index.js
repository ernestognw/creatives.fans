import { Router } from 'express';
import { User, Session } from '@db/models';
import { compareSync } from 'bcryptjs';
import { cookie } from '@config/constants';
import { tokens } from './utils';

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

auth.post('/login', async (req, res) => {
  const { emailUsername, password, expires = true } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailUsername }, { username: emailUsername }],
    });

    if (!user || !compareSync(password, user.password))
      return res.status(401).json({
        message: 'Login failed',
        error: "Email and password don't match",
      });

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
