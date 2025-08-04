import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNumber()
  @IsOptional()
  providerId?: number;
}
