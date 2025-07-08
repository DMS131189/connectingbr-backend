import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // Verificar se email já existe
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });
    
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Criar novo usuário (removendo campos de confirmação)
    const { confirmEmail, confirmPassword, ...userData } = createUserDto;
    
    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);

    // Retornar usuário sem a senha
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Verificar se novo email já está em uso (se fornecido)
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email }
      });
      
      if (existingUser) {
        throw new ConflictException('Email já está em uso');
      }
    }

    // Atualizar usuário
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado após atualização`);
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    await this.userRepository.delete(id);
    return { message: `Usuário com ID ${id} removido com sucesso` };
  }
}
