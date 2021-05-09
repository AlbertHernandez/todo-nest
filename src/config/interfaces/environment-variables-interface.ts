import { Environment } from '../constants';

export interface EnvironmentVariables {
  development: boolean;
  test: boolean;
  beta: boolean;
  production: boolean;
  mongo: {
    url: string;
  };
  port: number;
  apiKey: string;
  environment: Environment;
}
