import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Request } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    return this.reviewService.create(createReviewDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('professional/:professionalId')
  findByProfessional(@Param('professionalId', ParseIntPipe) professionalId: number) {
    return this.reviewService.findByProfessional(professionalId);
  }

  @Get('professional/:professionalId/average')
  getAverageRating(@Param('professionalId', ParseIntPipe) professionalId: number) {
    return this.reviewService.getAverageRating(professionalId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReviewDto: UpdateReviewDto, @Request() req) {
    return this.reviewService.update(id, updateReviewDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.reviewService.remove(id, req.user.id);
  }
} 