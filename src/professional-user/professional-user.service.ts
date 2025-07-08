import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessionalUserDto } from './dto/create-professional-user.dto';
import { UpdateProfessionalUserDto } from './dto/update-professional-user.dto';
import { ProfessionalUser } from './entities/professional-user.entity';

@Injectable()
export class ProfessionalUserService {
  constructor(
    @InjectRepository(ProfessionalUser)
    private professionalUserRepository: Repository<ProfessionalUser>,
  ) {}

  async create(createProfessionalUserDto: CreateProfessionalUserDto): Promise<Omit<ProfessionalUser, 'password'>> {
    // Check if email already exists
    const existingUser = await this.professionalUserRepository.findOne({
      where: { email: createProfessionalUserDto.email }
    });
    
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Create new professional user (removing confirmation fields)
    const { confirmEmail, confirmPassword, photos, ...userData } = createProfessionalUserDto;
    
    // Handle photos array conversion to JSON string
    const photosString = photos ? JSON.stringify(photos) : undefined;
    
    const professionalUser = this.professionalUserRepository.create({
      ...userData,
      photos: photosString
    });
    
    const savedUser = await this.professionalUserRepository.save(professionalUser);

    // Return user without password
    const { password, ...userWithoutPassword } = savedUser;
    return {
      ...userWithoutPassword,
      photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
    } as any;
  }

  async findAll(): Promise<Omit<ProfessionalUser, 'password'>[]> {
    const users = await this.professionalUserRepository.find();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
      } as any;
    });
  }

  async findOne(id: number): Promise<Omit<ProfessionalUser, 'password'>> {
    const user = await this.professionalUserRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`Professional user with ID ${id} not found`);
    }

    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
    } as any;
  }

  async update(id: number, updateProfessionalUserDto: UpdateProfessionalUserDto): Promise<Omit<ProfessionalUser, 'password'>> {
    const user = await this.professionalUserRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`Professional user with ID ${id} not found`);
    }

    // Check if new email is already in use (if provided)
    if (updateProfessionalUserDto.email && updateProfessionalUserDto.email !== user.email) {
      const existingUser = await this.professionalUserRepository.findOne({
        where: { email: updateProfessionalUserDto.email }
      });
      
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }
    }

    // Handle photos array conversion if provided
    const updateData: any = { ...updateProfessionalUserDto };
    if (updateData.photos) {
      updateData.photos = JSON.stringify(updateData.photos);
    }

    // Update professional user
    await this.professionalUserRepository.update(id, updateData);
    const updatedUser = await this.professionalUserRepository.findOne({ where: { id } });

    if (!updatedUser) {
      throw new NotFoundException(`Professional user with ID ${id} not found after update`);
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return {
      ...userWithoutPassword,
      photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
    } as any;
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.professionalUserRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`Professional user with ID ${id} not found`);
    }

    await this.professionalUserRepository.delete(id);
    return { message: `Professional user with ID ${id} successfully removed` };
  }
} 