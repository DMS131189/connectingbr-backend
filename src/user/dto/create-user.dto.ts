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
export class MatchField implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must be equal to ${relatedPropertyName}`;
  }
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MaxLength(50, { message: 'Name must have at most 50 characters' })
  name: string;

  @IsNotEmpty({ message: 'Surname is required' })
  @IsString({ message: 'Surname must be a string' })
  @MaxLength(50, { message: 'Surname must have at most 50 characters' })
  surname: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must have a valid format' })
  email: string;

  @IsNotEmpty({ message: 'Email confirmation is required' })
  @IsEmail({}, { message: 'Email confirmation must have a valid format' })
  @Validate(MatchField, ['email'], { message: 'Email confirmation must be equal to email' })
  confirmEmail: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  @MaxLength(20, { message: 'Password must have at most 20 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number or special symbol'
  })
  password: string;

  @IsNotEmpty({ message: 'Password confirmation is required' })
  @Validate(MatchField, ['password'], { message: 'Password confirmation must be equal to password' })
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
