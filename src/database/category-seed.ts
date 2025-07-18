import { DataSource } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';

export const CategoryDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Category, User],
  synchronize: true,
});

async function seedCategories() {
  try {
    // Initialize connection
    await CategoryDataSource.initialize();
    console.log('📊 Database connection established for categories');

    // Get repositories
    const categoryRepository = CategoryDataSource.getRepository(Category);

    // Check if categories already exist
    const existingCategories = await categoryRepository.count();
    if (existingCategories > 0) {
      console.log(`⚠️  ${existingCategories} categories already exist in database. Skipping seed...`);
      return;
    }

    // Seed data for categories
    const seedCategories = [
      {
        name: 'Fotografia',
        description: 'Serviços de fotografia profissional para eventos, casamentos, retratos e produtos',
        icon: '📸',
        order: 1,
        isActive: true
      },
      {
        name: 'Design Gráfico',
        description: 'Criação de identidades visuais, logos, materiais impressos e digitais',
        icon: '🎨',
        order: 2,
        isActive: true
      },
      {
        name: 'Desenvolvimento Web',
        description: 'Criação de sites, aplicações web e sistemas online',
        icon: '💻',
        order: 3,
        isActive: true
      },
      {
        name: 'Consultoria Empresarial',
        description: 'Consultoria estratégica para empresas e empreendedores',
        icon: '📊',
        order: 4,
        isActive: true
      },
      {
        name: 'Personal Trainer',
        description: 'Treinamento personalizado para fitness, musculação e saúde',
        icon: '💪',
        order: 5,
        isActive: true
      },
      {
        name: 'Culinária e Gastronomia',
        description: 'Serviços de catering, aulas de culinária e eventos gastronômicos',
        icon: '👨‍🍳',
        order: 6,
        isActive: true
      },
      {
        name: 'Educação e Tutoria',
        description: 'Aulas particulares, cursos e reforço escolar',
        icon: '📚',
        order: 7,
        isActive: true
      },
      {
        name: 'Beleza e Estética',
        description: 'Serviços de beleza, maquiagem, cabelo e estética',
        icon: '💄',
        order: 8,
        isActive: true
      },
      {
        name: 'Eventos e Festas',
        description: 'Organização de eventos, festas e celebrações',
        icon: '🎉',
        order: 9,
        isActive: true
      },
      {
        name: 'Marketing Digital',
        description: 'Estratégias de marketing online, redes sociais e publicidade',
        icon: '📱',
        order: 10,
        isActive: true
      },
      {
        name: 'Saúde e Bem-estar',
        description: 'Serviços de saúde, terapia, massagem e bem-estar',
        icon: '🧘',
        order: 11,
        isActive: true
      },
      {
        name: 'Tecnologia e TI',
        description: 'Suporte técnico, manutenção de computadores e serviços de TI',
        icon: '🔧',
        order: 12,
        isActive: true
      },
      {
        name: 'Arquitetura e Decoração',
        description: 'Projetos arquitetônicos, decoração de interiores e reformas',
        icon: '🏠',
        order: 13,
        isActive: true
      },
      {
        name: 'Tradução e Idiomas',
        description: 'Serviços de tradução, interpretação e aulas de idiomas',
        icon: '🌍',
        order: 14,
        isActive: true
      },
      {
        name: 'Outros',
        description: 'Outros serviços profissionais diversos',
        icon: '✨',
        order: 15,
        isActive: true
      }
    ];

    // Insert categories
    console.log('🌱 Starting category seed...');
    
    for (const categoryData of seedCategories) {
      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);
      console.log(`✅ Category created: ${categoryData.name} (${categoryData.icon})`);
    }

    console.log(`🎉 Category seed completed! ${seedCategories.length} categories were inserted into the database.`);

  } catch (error) {
    console.error('❌ Error during category seed:', error);
  } finally {
    // Close connection
    await CategoryDataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

// Execute seed if this file is called directly
if (require.main === module) {
  seedCategories();
}

export { seedCategories }; 