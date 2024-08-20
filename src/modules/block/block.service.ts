import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BlockUnBlockToggle,
  BlockUnBlockToggleDocument,
} from './schemas/block-user.schema';
import { Model, Types } from 'mongoose';
import { BlockUnblocktToggleDTO } from './dto/blockunblocktoggle.dto';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(BlockUnBlockToggle.name)
    private readonly blockunblocktoggleModel: Model<BlockUnBlockToggle>,
  ) {}

  async blockunblockToggle(
    blockObj: BlockUnblocktToggleDTO,
    userId: Types.ObjectId,
  ): Promise<BlockUnBlockToggleDocument> {
    const filter = {
      requesterId: userId,
      recipientId: blockObj.recipientId,
    };

    const update = {
      status: blockObj.status,
    };

    const options = {
      upsert: true,
      new: true,
    };

    const result = await this.blockunblocktoggleModel
      .findOneAndUpdate(filter, update, options)
      .exec();

    return result;
  }

  async isBlocked(
    recipientId: Types.ObjectId,
    requesterId: Types.ObjectId,
  ): Promise<boolean> {
    const blockRecord = await this.blockunblocktoggleModel
      .findOne({
        $or: [
          { requesterId, recipientId },
          { requesterId: recipientId, recipientId: requesterId },
        ],
      })
      .exec();

    return blockRecord?.status === true;
  }
}
