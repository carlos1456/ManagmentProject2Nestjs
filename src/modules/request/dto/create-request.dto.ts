import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly requesterId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly recipantid: Types.ObjectId;

  @IsOptional()
  readonly status: string;
}
