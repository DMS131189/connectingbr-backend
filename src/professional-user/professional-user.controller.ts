import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalUserService } from './professional-user.service';
import { CreateProfessionalUserDto } from './dto/create-professional-user.dto';
import { UpdateProfessionalUserDto } from './dto/update-professional-user.dto';

@Controller('professional-user')
export class ProfessionalUserController {
  constructor(private readonly professionalUserService: ProfessionalUserService) {}

  @Post()
  create(@Body() createProfessionalUserDto: CreateProfessionalUserDto) {
    return this.professionalUserService.create(createProfessionalUserDto);
  }

  @Get()
  findAll() {
    return this.professionalUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionalUserDto: UpdateProfessionalUserDto) {
    return this.professionalUserService.update(+id, updateProfessionalUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalUserService.remove(+id);
  }
} 