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
    if (params.q) {
      queryBuilder.andWhere(
        '(service.name LIKE :query OR service.description LIKE :query)',
        { query: `%${params.q}%` }
      );
    }

    // Filtro por preço mínimo
    if (params.precoMin) {
      queryBuilder.andWhere('CAST(REPLACE(REPLACE(service.price, "€", ""), "-", "") AS DECIMAL) >= :precoMin', {
        precoMin: params.precoMin
      });
    }

    // Filtro por preço máximo
    if (params.precoMax) {
      queryBuilder.andWhere('CAST(REPLACE(REPLACE(service.price, "€", ""), "-", "") AS DECIMAL) <= :precoMax', {
        precoMax: params.precoMax
      });
    }

    // Filtro por avaliação mínima
    if (params.avaliacaoMin) {
      queryBuilder.andWhere('service.rating >= :avaliacaoMin', {
        avaliacaoMin: params.avaliacaoMin
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
