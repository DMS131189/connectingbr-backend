import { DataSource } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

export const categorySeeds = [
  {
    name: 'Health',
    value: 'health',
    icon: 'assets/images/helth.png',
    description: 'Medical and wellness services',
    color: '#20B2AA',
    isActive: true
  },
  {
    name: 'Beauty',
    value: 'beauty',
    icon: 'assets/images/beauty.png',
    description: 'Beauty and aesthetic services',
    color: '#FF69B4',
    isActive: true
  },
  {
    name: 'Services',
    value: 'services',
    icon: 'assets/images/services.png',
    description: 'General and professional services',
    color: '#4169E1',
    isActive: true
  },
  {
    name: 'Others',
    value: 'others',
    icon: 'assets/images/others.png',
    description: 'Other specialized services',
    color: '#6A5ACD',
    isActive: true
  }
];

export async function seedCategories(dataSource: DataSource) {
  const categoryRepository = dataSource.getRepository(Category);
  
  // Check if categories already exist
  const existingCategories = await categoryRepository.find();
  if (existingCategories.length > 0) {
    console.log('📁 Categories already exist in database');
    return;
  }

  // Create categories
  for (const categoryData of categorySeeds) {
    const category = categoryRepository.create(categoryData);
    await categoryRepository.save(category);
  }

  console.log('🌱 Categories seeded successfully');
}
