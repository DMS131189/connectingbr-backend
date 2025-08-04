import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { Review } from '../review/entities/review.entity';
import { Service } from '../service/entities/service.entity';
import { ConfigService } from './config.service';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const baseConfig = configService.getDatabaseConfig();
  
  return {
    ...baseConfig,
    entities: [User, Category, Review, Service],
  };
}; 