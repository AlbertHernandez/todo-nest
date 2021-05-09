import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Database } from './interfaces';
import { Identifiers } from '../configuration/constants';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      async useFactory(configService: ConfigService) {
        const databaseConfig = configService.get<Database>(
          Identifiers.Database,
        );
        return {
          uri: databaseConfig.url,
          useCreateIndex: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
