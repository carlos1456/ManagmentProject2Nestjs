import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly recipientId: Types.ObjectId;
}
