import { cleanEnv, str, port, url } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port(),
  MONGODB_URI: url(),
  JWT_SECRET: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  FRONTEND_URL: url(),
  SMTP_HOST: str({ default: 'smtp.gmail.com' }),
  SMTP_PORT: port({ default: 587 }),
  SMTP_USER: str(),
  SMTP_PASS: str(),
  FROM_EMAIL: str(),
});

export const config = {
  port: env.PORT,
  database: {
    url: env.MONGODB_URI,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '24h',
  },
  cors: {
    origin: env.FRONTEND_URL,
  },
  nodeEnv: env.NODE_ENV,
  email: {
    smtp: {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    from: env.FROM_EMAIL,
  },
} as const; 