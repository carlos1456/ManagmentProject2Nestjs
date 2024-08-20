import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';
import { Role } from 'src/Common/Enums/roles.enum.';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @IsOptional()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly device_token: string;

  @IsOptional()
  @IsMongoId()
  readonly ssn_image: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly profileImage: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly backgroundImage: Types.ObjectId;

  @IsOptional()
  @IsEnum(Role)
  role: Role[];
}
