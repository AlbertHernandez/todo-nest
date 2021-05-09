import * as Joi from '@hapi/joi';
import { Environment } from '../constants';

export const environmentVariablesSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.Development),
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().required(),
  API_KEY: Joi.string().required(),
});
