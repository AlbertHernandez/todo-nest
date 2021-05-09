import { Database } from '../../database/interfaces';
import { Environment } from '../constants';

export interface EnvironmentVariables {
  development: boolean;
  test: boolean;
  beta: boolean;
  production: boolean;
  database: Database;
  port: number;
  apiKey: string;
  environment: Environment;
}
