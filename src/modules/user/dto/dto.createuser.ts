import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

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
  readonly ssn_image: Types.ObjectId;

  @IsOptional()
  readonly profileImage: Types.ObjectId;

  @IsOptional()
  readonly backgroundImage: Types.ObjectId;
}
