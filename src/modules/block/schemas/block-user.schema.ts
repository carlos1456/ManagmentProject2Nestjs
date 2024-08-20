import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type BlockUnBlockToggleDocument = HydratedDocument<BlockUnBlockToggle>;

@Schema()
export class BlockUnBlockToggle {
  @Prop({ type: Types.ObjectId, ref: 'users' })
  requesterId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'users' })
  recipientId: Types.ObjectId;
  @Prop({
    type: Boolean,
    default: false,
  })
  status: Boolean;
}

export const BlockUnBlockToggleSchema =
  SchemaFactory.createForClass(BlockUnBlockToggle);
