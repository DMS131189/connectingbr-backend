import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });
    
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Create new user (removing confirmation fields)
    const { confirmEmail, confirmPassword, photos, ...userData } = createUserDto;
    
    // Handle photos array conversion to JSON string
    const photosString = photos ? JSON.stringify(photos) : undefined;
    
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      photos: photosString
    });
    
    const savedUser = await this.userRepository.save(user);

    // Return user without password
    const { password, ...userWithoutPassword } = savedUser;
    return {
      ...userWithoutPassword,
      photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
    } as any;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
      } as any;
    });
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    // Validate that id is a valid number
    if (!id || isNaN(id) || id <= 0) {
      throw new NotFoundException(`Invalid user ID: ${id}`);
    }

    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
    } as any;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if new email is already in use (if provided)
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email }
      });
      
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }
    }

    // Handle photos array conversion if provided
    const updateData: any = { ...updateUserDto };
    if (updateData.photos) {
      updateData.photos = JSON.stringify(updateData.photos);
    }

    // Update user
    await this.userRepository.update(id, updateData);
    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found after update`);
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return {
      ...userWithoutPassword,
      photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
    } as any;
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);
    return { message: `User with ID ${id} successfully removed` };
  }
}
