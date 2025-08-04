import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { SearchServiceDto } from './dto/search-service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll(@Query('categoryId') categoryId?: number) {
    if (categoryId) {
      return this.serviceService.findByCategory(categoryId);
    }
    return this.serviceService.findAll();
  }

  @Get('search')
  search(@Query() searchParams: SearchServiceDto) {
    return this.serviceService.search(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
