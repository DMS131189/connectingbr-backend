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
    // Inicializar conexão
    await AppDataSource.initialize();
    console.log('📊 Conexão com banco de dados estabelecida');

    // Obter repositório
    const userRepository = AppDataSource.getRepository(User);

    // Limpar tabela de usuários
    console.log('🗑️  Limpando tabela de usuários...');
    await userRepository.clear();
    console.log('✅ Tabela de usuários limpa');

    // Fechar conexão atual
    await AppDataSource.destroy();

    // Executar seed
    console.log('🌱 Iniciando repopulação...');
    await seed();

  } catch (error) {
    console.error('❌ Erro durante reset e seed:', error);
  }
}

// Executar se este arquivo for chamado diretamente
if (require.main === module) {
  resetAndSeed();
}

export { resetAndSeed }; 