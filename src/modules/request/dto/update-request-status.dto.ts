import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { RequestStatus } from 'src/Common/Enums/request-status.enum';

export class UpdateRequestDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly requestId: Types.ObjectId;

  @IsEnum(RequestStatus)
  @IsNotEmpty()
  readonly status: RequestStatus;
}
