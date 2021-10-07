import AWS from '@connections/aws/client';

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const getCommonConfig = (to) => ({
  Destination: {
    ToAddresses: [to],
  },
  Source: 'Creatives Fans <no-reply@creatives.fans>',
});

const send = {
  welcome: (to, { username, email, password }) =>
    ses
      .sendTemplatedEmail({
        ...getCommonConfig(to),
        Template: 'welcome',
        TemplateData: JSON.stringify({ username, email, password }),
      })
      .promise(),
  recoverPassword: (to, { link }) =>
    ses
      .sendTemplatedEmail({
        ...getCommonConfig(to),
        Template: 'recover-password',
        TemplateData: JSON.stringify({ link }),
      })
      .promise(),
};

export { send };
