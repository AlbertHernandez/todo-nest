import { Environment } from '../constants';

export interface ServerConfig {
  development: boolean;
  test: boolean;
  beta: boolean;
  production: boolean;
  port: number;
  apiKey: string;
  environment: Environment;
}
