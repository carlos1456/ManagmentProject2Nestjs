import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type UserDocument = HydratedDocument<Request>;

@Schema()
export class Request {
  @Prop({ type: Types.ObjectId, ref: 'users' })
  requester: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'users' })
  recipient: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['accepted', 'rejected', 'pending'],
    default: 'rejected',
  })
  status: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
