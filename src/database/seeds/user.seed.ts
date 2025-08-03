import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserRole } from '../../user/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

export const userSeeds = [
  {
    name: 'Admin',
    surname: 'System',
    email: 'admin@connectingbr.com',
    password: '123456',
    role: UserRole.ADMIN
  },
  {
    name: 'João',
    surname: 'Silva',
    email: 'joao@connectingbr.com',
    password: '123456',
    role: UserRole.CLIENT
  },
  {
    name: 'Maria',
    surname: 'Santos',
    email: 'maria@connectingbr.com',
    password: '123456',
    role: UserRole.PROFESSIONAL,
    businessName: 'Maria Beauty Salon',
    businessDescription: 'Professional beauty services with over 10 years of experience',
    website: 'http://mariabeauty.com'
  }
];

export async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  
  // Check if users already exist
  const existingUsers = await userRepository.find();
  if (existingUsers.length > 0) {
    console.log('👥 Users already exist in database');
    return;
  }

  // Hash password and create users
  const saltRounds = 10;
  for (const userData of userSeeds) {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    
    const user = userRepository.create({
      ...userData,
      password: hashedPassword
    });
    
    await userRepository.save(user);
  }

  console.log('🌱 Users seeded successfully');
}
