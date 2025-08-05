import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { SearchServiceDto } from './dto/search-service.dto';
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

  findByCategory(categoryId: number) {
    return this.serviceRepository.find({
      where: { categoryId },
      relations: ['category', 'provider']
    });
  }

  async search(params: SearchServiceDto) {
    const queryBuilder = this.serviceRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.category', 'category')
      .leftJoinAndSelect('service.provider', 'provider');

    // Filtro por categoria
    if (params.categoryId) {
      queryBuilder.andWhere('service.categoryId = :categoryId', { 
        categoryId: params.categoryId 
      });
    }

    // Busca por texto (nome ou descrição)
    if (params.query) {
      queryBuilder.andWhere(
        '(service.name LIKE :query OR service.description LIKE :query)',
        { query: `%${params.query}%` }
      );
    }

    // Filtro por preço mínimo
    if (params.minPrice) {
      queryBuilder.andWhere('CAST(REPLACE(REPLACE(service.price, "€", ""), "-", "") AS DECIMAL) >= :minPrice', {
        minPrice: params.minPrice
      });
    }

    // Filtro por preço máximo
    if (params.maxPrice) {
      queryBuilder.andWhere('CAST(REPLACE(REPLACE(service.price, "€", ""), "-", "") AS DECIMAL) <= :maxPrice', {
        maxPrice: params.maxPrice
      });
    }

    // Filtro por avaliação mínima
    if (params.minRating) {
      queryBuilder.andWhere('service.rating >= :minRating', {
        minRating: params.minRating
      });
    }

    return queryBuilder.getMany();
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
