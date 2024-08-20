import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/user/schemas/schema.user';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(newuser: any): Promise<any> {
    const existingUser = await this.userModel
      .findOne({ email: newuser.email })
      .exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const createuser = new this.userModel(newuser);
    await createuser.save();
    const payload = { sub: newuser._id, username: newuser.email };
    const token = await this.jwtService.signAsync(payload);
    return { token, newuser };
  }

  async findOne(username): Promise<any> {
    return this.userModel.findOne({ email: username });
  }
  async findbyid(id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(id);
  }
}
