import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { getDatabaseConfig } from './config/database.config';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { ServiceModule } from './service/service.module';
import { DatabaseSeederModule } from './database/database-seeder.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    ReviewModule,
    ServiceModule,
    DatabaseSeederModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
