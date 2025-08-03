import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedCategories } from './seeds/category.seed';
import { seedServices } from './seeds/service.seed';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      console.log('🌱 Starting database seeding...');
      
      // Execute seeds in order
      await seedCategories(this.dataSource);
      await seedServices(this.dataSource);
      
      console.log('✅ Database seeding completed');
    } catch (error) {
      console.error('❌ Error during database seeding:', error);
    }
  }
}
