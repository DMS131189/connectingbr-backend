import { IsNumber, IsString, IsOptional, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNumber({}, { message: 'Rating must be a number' })
  @IsNotEmpty({ message: 'Rating is required' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  rating: number;

  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment?: string;

  @IsNumber({}, { message: 'Professional ID must be a number' })
  @IsNotEmpty({ message: 'Professional ID is required' })
 