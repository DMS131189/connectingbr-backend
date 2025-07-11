import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { seed } from './seed';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User],
  synchronize: true,
});

async function resetAndSeed() {
  try {
    // Initialize connection
    await AppDataSource.initialize();
    console.log('📊 Database connection established');

    // Get repositories
    const userRepository = AppDataSource.getRepository(User);

    // Clear tables
    console.log('🗑️  Clearing users table...');
    await userRepository.clear();
    console.log('✅ Users table cleared');

    // Close current connection
    await AppDataSource.destroy();

    // Execute seed
    console.log('🌱 Starting repopulation...');
    await seed();

  } catch (error) {
    console.error('❌ Error during reset and seed:', error);
  }
}

// Execute if this file is called directly
if (require.main === module) {
  resetAndSeed();
}

export { resetAndSeed }; 