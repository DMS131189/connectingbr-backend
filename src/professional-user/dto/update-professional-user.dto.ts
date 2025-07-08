import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalUserDto } from './create-professional-user.dto';

export class UpdateProfessionalUserDto extends PartialType(CreateProfessionalUserDto) {} 