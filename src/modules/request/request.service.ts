import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Request, RequestDocument } from './schemas/request';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDTO } from './dto/update-request-status.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name)
    private readonly requestModel: Model<RequestDocument>,
  ) {}

  async sendRequest(
    newRequest: CreateRequestDto,
    userId: Types.ObjectId,
  ): Promise<RequestDocument> {
    const requesterId = userId;
    const recipientId = newRequest.recipientId;

    // Check if the request already exists
    const existingRequest = await this.isAlreadyRequested(
      requesterId,
      recipientId,
    );

    if (existingRequest) {
      switch (existingRequest.status) {
        case 'accepted':
          throw new ConflictException('Request already accepted');
        case 'rejected':
          throw new ConflictException('Request already rejected');
        default:
          throw new ConflictException('Request already sent');
      }
    }

    const requestObj = {
      requesterId,
      recipientId,
      status: 'pending',
    };

    return await this.requestModel.create(requestObj);
  }

  async updateRequestStatus(
    requestObj: UpdateRequestDTO,
  ): Promise<RequestDocument> {
    const requestId = requestObj.requestId;
    const existingRequest = await this.requestModel.findById(requestId).exec();

    if (!existingRequest) {
      throw new NotFoundException(`${requestId} Not Found`);
    }

    return await this.requestModel
      .findByIdAndUpdate(
        requestId,
        { status: requestObj.status },
        { new: true },
      )
      .exec();
  }

  async isAlreadyRequested(
    requesterId: Types.ObjectId,
    recipientId: Types.ObjectId,
  ): Promise<RequestDocument | null> {
    return await this.requestModel
      .findOne({
        requesterId,
        recipientId,
      })
      .exec();
  }
}
