import { LoggerLevel } from 'src/server/logger/constants/logger-level.constant';
import { Environment } from '../constants';
import { ServerConfig } from '../interfaces';

const isNodeEnv = (env: Environment): boolean => process.env.NODE_ENV === env;

export const getServerConfig = (): { server: ServerConfig } => ({
  server: {
    development: isNodeEnv(Environment.Development),
    test: isNodeEnv(Environment.Test),
    beta: isNodeEnv(Environment.Beta),
    production: isNodeEnv(Environment.Production),
    port: Number(process.env.PORT),
    environment: process.env.NODE_ENV as Environment,
    apiKey: process.env.API_KEY,
    loggerLevel: process.env.LOGGER_LEVEL as LoggerLevel,
  },
});
