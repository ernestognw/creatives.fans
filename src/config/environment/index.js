import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const mongo = {
  url: process.env.MONGO_URI,
};

const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
};

const AWSConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  s3Bucket: process.env.AWS_S3_BUCKET,
};

export { port, mongo, env, AWSConfig };
