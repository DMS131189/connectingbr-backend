import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { Service } from '../service/entities/service.entity';
import { Review } from '../review/entities/review.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: true,
  entities: [User, Category, Service, Review],
  dropSchema: true
});

async function resetDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('📊 Database connection established');
    
    console.log('🗑️  Database reset completed');
    
    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error during database reset:', error);
    process.exit(1);
  }
}

resetDatabase()
  .then(() => {
    console.log('✅ Database reset successful');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
