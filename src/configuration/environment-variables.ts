import { Environment } from './constants';
import { EnvironmentVariables } from './interfaces';

const isNodeEnv = (env: Environment): boolean => process.env.NODE_ENV === env;

export const getEnvironmentVariables = (): EnvironmentVariables => ({
  development: isNodeEnv(Environment.Development),
  test: isNodeEnv(Environment.Test),
  beta: isNodeEnv(Environment.Beta),
  production: isNodeEnv(Environment.Production),
  database: {
    url: process.env.MONGO_URI,
  },
  port: Number(process.env.PORT),
  environment: process.env.NODE_ENV as Environment,
  apiKey: process.env.API_KEY,
});
