import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  MinLength, 
  MaxLength,
  Matches,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsOptional,
  IsUrl,
  IsArray
} from 'class-validator';
import { Transform } from 'class-transformer';

@ValidatorConstraint({ name: 'MatchField' })
export class MatchFieldConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
}

export class RegisterAuthDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  @MaxLength(50, { message: 'Name must have at most 50 characters' })
  name: string;

  @IsString({ message: 'Surname must be a string' })
  @IsNotEmpty({ message: 'Surname is required' })
  @MinLength(2, { message: 'Surname must have at least 2 characters' })
  @MaxLength(50, { message: 'Surname must have at most 50 characters' })
  surname: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsEmail({}, { message: 'Email confirmation must be a valid email address' })
  @IsNotEmpty({ message: 'Email confirmation is required' })
  @Validate(MatchFieldConstraint, ['email'], { message: 'Email confirmation must be equal to email' })
  confirmEmail: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  @MaxLength(50, { message: 'Password must have at most 50 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  })
  password: string;

  @IsString({ message: 'Password confirmation must be a string' })
  @IsNotEmpty({ message: 'Password confirmation is required' })
  @Validate(MatchFieldConstraint, ['password'], { message: 'Password confirmation must be equal to password' })
  confirmPassword: string;

  @IsOptional()
  @IsString({ message: 'Business name must be a string' })
  @MaxLength(100, { message: 'Business name must have at most 100 characters' })
  businessName?: string;

  @IsOptional()
  @IsString({ message: 'Business description must be a string' })
  @MinLength(10, { message: 'Business description must have at least 10 characters' })
  @MaxLength(1000, { message: 'Business description must have at most 1000 characters' })
  businessDescription?: string;

  @IsOptional()
  @IsArray({ message: 'Photos must be an array' })
  @IsUrl({}, { each: true, message: 'Each photo must be a valid URL' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  photos?: string[];

  @IsOptional()
  @IsString({ message: 'Website must be a string' })
  @IsUrl({}, { message: 'Website must be a valid URL' })
  @MaxLength(255, { message: 'Website must have at most 255 characters' })
  website?: string;
} 