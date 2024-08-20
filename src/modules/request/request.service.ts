// src/modules/request/request.service.ts
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
import { UserModule } from '../user/user.module';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name)
    private readonly requestModel: Model<Request>,
  ) {}

  async sendRequest(
    newRequest: CreateRequestDto,
    userid: Types.ObjectId,
  ): Promise<RequestDocument> {
    const requesterId = userid;
    const recipientId = newRequest.recipientId;

    // we need check block user
    const existingRequest = await this.isAlreadyRequested(
      requesterId,
      recipientId,
    );

    if (existingRequest) {
      if (existingRequest.status === 'accepted') {
        throw new ConflictException('Request already accepted');
      }
      if (existingRequest.status === 'rejected') {
        throw new ConflictException('Request already rejected');
      }
      throw new ConflictException('Request already sent');
    }

    const requestObj = {
      requesterId: requesterId,
      recipientId: recipientId,
      status: 'pending',
    };
    return await this.requestModel.create(requestObj);
  }

  async UpdateRequestStatus(
    requestObj: UpdateRequestDTO,
  ): Promise<RequestDocument> {
    const requestid = requestObj.requestId;
    const isrequestexist = await this.requestModel.findById(requestid);

    if (!isrequestexist) {
      throw new NotFoundException(`${requestid} Not Found`);
    }
    return await this.requestModel.findByIdAndUpdate(
      requestid,
      { status: requestObj.status },
      { new: true },
    );
  }

  async isAlreadyRequested(
    requesterId: Types.ObjectId,
    recipientId: Types.ObjectId,
  ): Promise<RequestDocument> {
    return await this.requestModel
      .findOne({
        requesterId: requesterId,
        recipientId: recipientId,
      })
      .exec();
  }
}
