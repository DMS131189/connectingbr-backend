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
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchField' })
export class MatchField implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} deve ser igual ao campo ${relatedPropertyName}`;
  }
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(50, { message: 'Nome deve ter no máximo 50 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'Sobrenome é obrigatório' })
  @IsString({ message: 'Sobrenome deve ser uma string' })
  @MaxLength(50, { message: 'Sobrenome deve ter no máximo 50 caracteres' })
  surname: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email: string;

  @IsNotEmpty({ message: 'Confirmação de email é obrigatória' })
  @IsEmail({}, { message: 'Confirmação de email deve ter um formato válido' })
  @Validate(MatchField, ['email'], { message: 'Confirmação de email deve ser igual ao email' })
  confirmEmail: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @MaxLength(20, { message: 'Senha deve ter no máximo 20 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha deve conter pelo menos: 1 letra maiúscula, 1 letra minúscula, 1 número ou símbolo especial'
  })
  password: string;

  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  @Validate(MatchField, ['password'], { message: 'Confirmação de senha deve ser igual à senha' })
  confirmPassword: string;
}
