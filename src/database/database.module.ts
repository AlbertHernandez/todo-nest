import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigIdentifier } from '../configuration/constants';
import { DatabaseConfig } from 'src/configuration/interfaces';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      async useFactory(configService: ConfigService) {
        const databaseConfig = configService.get<DatabaseConfig>(
          ConfigIdentifier.Database,
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
