import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/schema.user';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel:Model<User>){

  }

  async create(newuser:any):Promise<User>{
    const createuser=new this.userModel(newuser);
    return createuser.save();
   
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
 async findOne(id: string): Promise<User> {
  return this.userModel.findById(id).exec();
}

async deleteUser(id: string): Promise<any> {
  return this.userModel.findByIdAndDelete(id).exec();
}


}
