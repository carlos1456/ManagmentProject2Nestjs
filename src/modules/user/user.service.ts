import { ConflictException, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/modules/user/schemas/schema.user';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponse } from 'src/Common/interfaces/Create-user-response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(newuser: CreateUserDto): Promise<CreateUserResponse> {
    const existingUser = await this.userModel
      .findOne({ email: newuser.email })
      .exec();

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const createduser = await this.userModel.create(newuser);
    const payload = { sub: createduser._id, username: createduser.email };
    const token = await this.jwtService.signAsync(payload);

    return { token, createduser };
  }

  async finduserbyEmail(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: username }).exec();
  }

  async finduserbyid(id: Types.ObjectId): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
}
