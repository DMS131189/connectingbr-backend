import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerAuthDto.email }
    });
    
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerAuthDto.password, saltRounds);

    // Create new user (removing confirmation fields)
    const { confirmEmail, confirmPassword, photos, ...userData } = registerAuthDto;
    
    // Handle photos array conversion to JSON string
    const photosString = photos ? JSON.stringify(photos) : undefined;
    
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      photos: photosString
    });
    
    const savedUser = await this.userRepository.save(user);

    // Generate JWT token
    const payload = { sub: savedUser.id, email: savedUser.email };
    const token = this.jwtService.sign(payload);

    // Return user without password and token
    const { password, ...userWithoutPassword } = savedUser;
    return {
      message: 'User registered successfully',
      user: {
        ...userWithoutPassword,
        photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
      },
      token
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Return user without password and token
    const { password: _, ...userWithoutPassword } = user;
    return {
      message: 'Login successful',
      user: {
        ...userWithoutPassword,
        photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
      },
      token
    };
  }

  async logout() {
    return {
      message: 'Logout successful'
    };
  }

  async validateUser(userId: number): Promise<any> {
    // Validate that userId is a valid number
    if (!userId || isNaN(userId) || userId <= 0) {
      return null;
    }

    const user = await this.userRepository.findOne({
      where: { id: userId }
    });
    
    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      photos: userWithoutPassword.photos ? JSON.parse(userWithoutPassword.photos) : []
    };
  }
} 