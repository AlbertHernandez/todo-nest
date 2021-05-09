import { Environment } from './constants';
import { EnvironmentVariables } from './interfaces';

const getEnvironment = (): Environment => {
  const environment = process.env.NODE_ENV ?? '';
  const environments: string[] = Object.values(Environment);

  return environments.includes(environment)
    ? (environment as Environment)
    : Environment.Development;
};

const isNodeEnv = (env: Environment): boolean => process.env.NODE_ENV === env;

export default (): EnvironmentVariables => ({
  development: isNodeEnv(Environment.Development),
  test: isNodeEnv(Environment.Test),
  beta: isNodeEnv(Environment.Beta),
  production: isNodeEnv(Environment.Production),
  database: {
    url: process.env.MONGO_URI ?? '',
  },
  port: Number(process.env.PORT ?? 3000),
  environment: getEnvironment(),
  apiKey: process.env.API_KEY ?? '',
});
