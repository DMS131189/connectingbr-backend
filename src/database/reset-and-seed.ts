import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ProfessionalUser } from '../professional-user/entities/professional-user.entity';
import { seed } from './seed';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User, ProfessionalUser],
  synchronize: true,
});

async function resetAndSeed() {
  try {
    // Initialize connection
    await AppDataSource.initialize();
    console.log('📊 Database connection established');

    // Get repositories
    const userRepository = AppDataSource.getRepository(User);
    const professionalUserRepository = AppDataSource.getRepository(ProfessionalUser);

    // Clear tables
    console.log('🗑️  Clearing users and professional users tables...');
    await userRepository.clear();
    await professionalUserRepository.clear();
    console.log('✅ Users and professional users tables cleared');

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