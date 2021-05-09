import { LoggerLevel } from 'src/logger/constants/logger-level.constant';
import { Environment } from '../constants';

export interface ServerConfig {
  development: boolean;
  test: boolean;
  beta: boolean;
  production: boolean;
  port: number;
  apiKey: string;
  environment: Environment;
  loggerLevel: LoggerLevel;
}
