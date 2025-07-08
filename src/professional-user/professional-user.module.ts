import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalUserService } from './professional-user.service';
import { ProfessionalUserController } from './professional-user.controller';
import { ProfessionalUser } from './entities/professional-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionalUser])],
  controllers: [ProfessionalUserController],
  providers: [ProfessionalUserService],
  exports: [ProfessionalUserService],
})
export class ProfessionalUserModule {} 