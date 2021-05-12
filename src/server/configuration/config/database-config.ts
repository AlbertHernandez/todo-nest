import { DatabaseConfig } from '../interfaces';

export const getDatabaseConfig = (): { database: DatabaseConfig } => ({
  database: {
    url: process.env.MONGO_URI,
  },
});
