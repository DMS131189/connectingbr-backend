import { DataSource } from 'typeorm';
import { Service } from '../../service/entities/service.entity';
import { Category } from '../../category/entities/category.entity';

export const serviceSeeds = [
  {
    name: 'Hair Styling',
    description: 'Professional hair cutting and styling services',
    price: '€ 8-15',
    rating: 4.8,
    provider: 'Salon Maria',
    categoryName: 'Beauty'
  },
  {
    name: 'Nutritionist Consultation',
    description: 'Personalized nutrition plans and health assessment',
    price: '€ 20-35',
    rating: 4.9,
    provider: 'Dr. Ana Santos',
    categoryName: 'Health'
  },
  {
    name: 'Home Cleaning',
    description: 'Complete residential cleaning service',
    price: '€ 13-25',
    rating: 4.7,
    provider: 'Clean Home',
    categoryName: 'Services'
  }
];

export async function seedServices(dataSource: DataSource) {
  const serviceRepository = dataSource.getRepository(Service);
  const categoryRepository = dataSource.getRepository(Category);
  
  // Check if services already exist
  const existingServices = await serviceRepository.find();
  if (existingServices.length > 0) {
    console.log('📁 Services already exist in database');
    return;
  }

  // Create services
  for (const serviceData of serviceSeeds) {
    const { categoryName, ...serviceInfo } = serviceData;
    
    // Find the category
    const category = await categoryRepository.findOne({ 
      where: { name: categoryName }
    });

    if (!category) {
      console.log(`⚠️ Category ${categoryName} not found, skipping service ${serviceData.name}`);
      continue;
    }

    const service = serviceRepository.create({
      ...serviceInfo,
      category,
      categoryId: category.id
    });

    await serviceRepository.save(service);
  }

  console.log('🌱 Services seeded successfully');
}
