import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ProfessionalUser } from '../professional-user/entities/professional-user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User, ProfessionalUser],
  synchronize: true,
});

async function seed() {
  try {
    // Initialize connection
    await AppDataSource.initialize();
    console.log('📊 Database connection established');

    // Get repositories
    const userRepository = AppDataSource.getRepository(User);
    const professionalUserRepository = AppDataSource.getRepository(ProfessionalUser);

    // Check if users already exist
    const existingUsers = await userRepository.count();
    const existingProfessionalUsers = await professionalUserRepository.count();
    if (existingUsers > 0 || existingProfessionalUsers > 0) {
      console.log(`⚠️  ${existingUsers} users and ${existingProfessionalUsers} professional users already exist in database. Skipping seed...`);
      return;
    }

    // Seed data for users
    const seedUsers = [
      {
        name: 'João',
        surname: 'Silva',
        email: 'joao.silva@example.com',
        password: 'MinhaSenh@123', // In production, hash the password
      },
      {
        name: 'Maria',
        surname: 'Santos',
        email: 'maria.santos@example.com',
        password: 'SenhaSegur@456',
      },
      {
        name: 'Pedro',
        surname: 'Oliveira',
        email: 'pedro.oliveira@example.com',
        password: 'Password@789',
      },
      {
        name: 'Ana',
        surname: 'Costa',
        email: 'ana.costa@example.com',
        password: 'MinhaCh@ve123',
      },
      {
        name: 'Carlos',
        surname: 'Pereira',
        email: 'carlos.pereira@example.com',
        password: 'SuperSenh@2024',
      },
      {
        name: 'Lucia',
        surname: 'Fernandes',
        email: 'lucia.fernandes@example.com',
        password: 'Segur@nca456',
      },
      {
        name: 'Roberto',
        surname: 'Almeida',
        email: 'roberto.almeida@example.com',
        password: 'RobertO@789',
      },
      {
        name: 'Fernanda',
        surname: 'Lima',
        email: 'fernanda.lima@example.com',
        password: 'Fern@nda123',
      },
      {
        name: 'Ricardo',
        surname: 'Souza',
        email: 'ricardo.souza@example.com',
        password: 'Ric@rdo2024',
      },
      {
        name: 'Juliana',
        surname: 'Martins',
        email: 'juliana.martins@example.com',
        password: 'Juli@na456',
      }
    ];

    // Insert users
    console.log('🌱 Starting user seed...');
    
    for (const userData of seedUsers) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
      console.log(`✅ User created: ${userData.name} ${userData.surname} (${userData.email})`);
    }

    console.log(`🎉 User seed completed! ${seedUsers.length} users were inserted into the database.`);

    // Seed data for professional users
    const seedProfessionalUsers = [
      {
        name: 'Alice',
        surname: 'Johnson',
        email: 'alice.johnson@business.com',
        password: 'Business@123',
        businessName: 'Johnson Photography',
        businessDescription: 'Professional photography services for weddings, events, and portraits. Over 10 years of experience capturing life\'s precious moments.',
        photos: JSON.stringify([
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
          'https://example.com/photo3.jpg'
        ]),
        website: 'https://johnsonphotography.com'
      },
      {
        name: 'Michael',
        surname: 'Brown',
        email: 'michael.brown@consulting.com',
        password: 'Consult@456',
        businessName: 'Brown Business Consulting',
        businessDescription: 'Strategic business consulting for small and medium enterprises. Helping businesses grow and optimize their operations.',
        photos: JSON.stringify([
          'https://example.com/consulting1.jpg',
          'https://example.com/consulting2.jpg'
        ]),
        website: 'https://brownbusinessconsulting.com'
      },
      {
        name: 'Sarah',
        surname: 'Davis',
        email: 'sarah.davis@design.com',
        password: 'Design@789',
        businessName: 'Davis Creative Design',
        businessDescription: 'Modern graphic design and branding solutions for startups and established companies. Creating visual identities that make an impact.',
        photos: JSON.stringify([
          'https://example.com/design1.jpg',
          'https://example.com/design2.jpg',
          'https://example.com/design3.jpg',
          'https://example.com/design4.jpg'
        ]),
        website: 'https://daviscreativedesign.com'
      },
      {
        name: 'James',
        surname: 'Wilson',
        email: 'james.wilson@fitness.com',
        password: 'Fitness@321',
        businessName: 'Wilson Personal Training',
        businessDescription: 'Certified personal trainer specializing in weight loss, muscle building, and athletic performance. Transform your body and lifestyle.',
        photos: JSON.stringify([
          'https://example.com/fitness1.jpg',
          'https://example.com/fitness2.jpg'
        ]),
        website: 'https://wilsonpersonaltraining.com'
      },
      {
        name: 'Emma',
        surname: 'Taylor',
        email: 'emma.taylor@catering.com',
        password: 'Catering@654',
        businessName: 'Taylor Gourmet Catering',
        businessDescription: 'Premium catering services for corporate events, weddings, and private parties. Fresh ingredients and exceptional presentation.',
        photos: JSON.stringify([
          'https://example.com/catering1.jpg',
          'https://example.com/catering2.jpg',
          'https://example.com/catering3.jpg'
        ]),
        website: 'https://taylorgourmetcatering.com'
      }
    ];

    // Insert professional users
    console.log('🌱 Starting professional user seed...');
    
    for (const professionalUserData of seedProfessionalUsers) {
      const professionalUser = professionalUserRepository.create(professionalUserData);
      await professionalUserRepository.save(professionalUser);
      console.log(`✅ Professional user created: ${professionalUserData.name} ${professionalUserData.surname} - ${professionalUserData.businessName}`);
    }

    console.log(`🎉 Professional user seed completed! ${seedProfessionalUsers.length} professional users were inserted into the database.`);

  } catch (error) {
    console.error('❌ Error during seed:', error);
  } finally {
    // Close connection
    await AppDataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

// Execute seed if this file is called directly
if (require.main === module) {
  seed();
}

export { seed }; 