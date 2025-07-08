import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User],
  synchronize: true,
});

async function seed() {
  try {
    // Inicializar conexão
    await AppDataSource.initialize();
    console.log('📊 Conexão com banco de dados estabelecida');

    // Obter repositório
    const userRepository = AppDataSource.getRepository(User);

    // Verificar se já existem usuários
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
      console.log(`⚠️  Já existem ${existingUsers} usuários no banco. Pulando seed...`);
      return;
    }

    // Dados de seed para usuários
    const seedUsers = [
      {
        name: 'João',
        surname: 'Silva',
        email: 'joao.silva@example.com',
        password: 'MinhaSenh@123', // Em produção, fazer hash da senha
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

    // Inserir usuários
    console.log('🌱 Iniciando seed de usuários...');
    
    for (const userData of seedUsers) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
      console.log(`✅ Usuário criado: ${userData.name} ${userData.surname} (${userData.email})`);
    }

    console.log(`🎉 Seed concluído! ${seedUsers.length} usuários foram inseridos no banco de dados.`);

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
  } finally {
    // Fechar conexão
    await AppDataSource.destroy();
    console.log('🔌 Conexão com banco de dados fechada');
  }
}

// Executar seed se este arquivo for chamado diretamente
if (require.main === module) {
  seed();
}

export { seed }; 