import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MediaDocument = HydratedDocument<Media>;

@Schema({ timestamps: true })
export class Media {
  @Prop({ required: true })
  file: string;

  @Prop({ type: String, enum: ["Image", "Video"], default: "Image" })
  fileType: string;

  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  userId: Types.ObjectId;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
