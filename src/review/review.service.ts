import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto, reviewerId: number): Promise<Review> {
    // Check if user already reviewed this professional
    const existingReview = await this.reviewRepository.findOne({
      where: { reviewerId, professionalId: createReviewDto.professionalId }
    });

    if (existingReview) {
      throw new ConflictException('You have already reviewed this professional');
    }

    // Check if reviewer is not reviewing themselves
    if (reviewerId === createReviewDto.professionalId) {
      throw new BadRequestException('You cannot review yourself');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      reviewerId
    });

    return await this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find({
      relations: ['reviewer', 'professional'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['reviewer', 'professional']
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async findByProfessional(professionalId: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { professionalId },
      relations: ['reviewer'],
      order: { createdAt: 'DESC' }
    });
  }

  async getAverageRating(professionalId: number): Promise<{ average: number; count: number }> {
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .addSelect('COUNT(review.id)', 'count')
      .where('review.professionalId = :professionalId', { professionalId })
      .getRawOne();

    return {
      average: result.average ? parseFloat(result.average) : 0,
      count: parseInt(result.count) || 0
    };
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, reviewerId: number): Promise<Review> {
    const review = await this.findOne(id);

    // Check if user owns this review
    if (review.reviewerId !== reviewerId) {
      throw new BadRequestException('You can only update your own reviews');
    }

    Object.assign(review, updateReviewDto);
    return await this.reviewRepository.save(review);
  }

  async remove(id: number, reviewerId: number): Promise<void> {
    const review = await this.findOne(id);

    // Check if user owns this review
    if (review.reviewerId !== reviewerId) {
      throw new BadRequestException('You can only delete your own reviews');
    }

    await this.reviewRepository.remove(review);
  }
} 