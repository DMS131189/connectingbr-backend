import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ProfessionalUser } from './professional-user/entities/professional-user.entity';
import { ProfessionalUserModule } from './professional-user/professional-user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, ProfessionalUser],
      synchronize: true, // for development only
    }),
    UserModule,
    ProfessionalUserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
