import { IsString, IsNotEmpty, IsOptional, IsUrl, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Icon must be a string' })
  @IsUrl({}, { message: 'Icon must be a valid URL' })
  icon?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Order must be a number' })
  @Min(0, { message: 'Order must be at least 0' })
  @Max(999, { message: 'Order must be at most 999' })
  order?: number;
} 