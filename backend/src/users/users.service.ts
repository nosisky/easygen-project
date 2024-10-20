import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: SignUpDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findByEmail(
    email: string,
    selectPassword: boolean = false,
  ): Promise<User | undefined> {
    if (selectPassword) {
      return this.userModel.findOne({ email }).select('-password').exec();
    }
    return this.userModel.findOne({ email }).exec();
  }
}
