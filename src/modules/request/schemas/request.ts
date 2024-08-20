import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type RequestDocument = HydratedDocument<Request>;

@Schema()
export class Request {
  @Prop({ type: Types.ObjectId, ref: 'users' })
  requesterId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'users' })
  recipientId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['accepted', 'rejected', 'pending'],
    default: 'pending',
  })
  status: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
