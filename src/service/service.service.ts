import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createServiceDto.categoryId }
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${createServiceDto.categoryId} not found`);
    }

    const service = this.serviceRepository.create({
      ...createServiceDto,
      category
    });
    
    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find({
      relations: ['category', 'provider']
    });
  }

  async findOne(id: string) {
    const service = await this.serviceRepository.findOne({ 
      where: { id },
      relations: ['category', 'provider']
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);
    Object.assign(service, updateServiceDto);
    return this.serviceRepository.save(service);
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    return this.serviceRepository.remove(service);
  }
}
