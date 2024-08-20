import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class BlockUnblocktToggleDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly recipientId: Types.ObjectId;

  @IsBoolean()
  @IsNotEmpty()
  readonly status: Boolean;
}
