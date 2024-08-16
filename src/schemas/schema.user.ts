import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: [true, "Please tell us your name"] })
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: [true, "Please provide a password"] })
  password: string;

  @Prop({ type: String, default: null })
  device_token: string;

  @Prop({ type: Types.ObjectId, ref: 'Media', default: null })
  ssn_image: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Media', default: null })
  profileImage: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Media', default: null })
  backgroundImage: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
