import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config')
  getConfig() {
    return {
      environment: this.configService.nodeEnv,
      database: this.configService.dbType,
      isDevelopment: this.configService.isDevelopment,
      isProduction: this.configService.isProduction,
      databaseUrl: this.configService.dbUrl ? '***hidden***' : null,
      databaseConfig: this.configService.isDevelopment ? 'sqlite' : {
        host: this.configService.dbHost,
        port: this.configService.dbPort,
        database: this.configService.dbDatabase,
        username: this.configService.dbUsername,
        password: '***hidden***',
      },
    };
  }
}
