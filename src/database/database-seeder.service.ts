import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedCategories } from './seeds/category.seed';
import { seedServices } from './seeds/service.seed';
import { seedUsers } from './seeds/user.seed';
import { seedReviews } from './seeds/review.seed';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      console.log('🌱 Starting database seeding...');
      
      // Execute seeds in order
      await seedUsers(this.dataSource);      // 1. Users first
      await seedCategories(this.dataSource); // 2. Then categories
      await seedServices(this.dataSource);   // 3. Then services
      await seedReviews(this.dataSource);    // 4. Finally reviews
      
      console.log('✅ Database seeding completed');
    } catch (error) {
      console.error('❌ Error during database seeding:', error);
    }
  }
}
