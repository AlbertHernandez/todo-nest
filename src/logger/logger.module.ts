import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigIdentifier } from '../configuration/constants';
import { ServerConfig } from '../configuration/interfaces';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const serverConfig = configService.get<ServerConfig>(
          ConfigIdentifier.Server,
        );
        return {
          pinoHttp: {
            level: serverConfig.loggerLevel,
            prettyPrint: serverConfig.development,
            timestamp() {
              return `Time: ${
                serverConfig.development
                  ? new Date(Date.now()).toLocaleString('en-US', {
                      hour12: false,
                      timeZoneName: 'short',
                    })
                  : new Date(Date.now()).toLocaleString('en-US', {
                      hour12: false,
                      timeZoneName: 'short',
                      timeZone: 'UTC',
                    })
              }`;
            },
          },
          formatters: {
            level: true,
          },
        };
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
