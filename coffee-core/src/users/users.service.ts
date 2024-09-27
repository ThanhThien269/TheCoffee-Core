import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPasswordHelper } from '@/helper/util';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  isEmailExist = async (email: string) => {
    const user = await this.userModel.findOne({ email: email });
    if (user) return true;
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;

    //check email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email ${email} already exists. Please enter a new email`,
      );
    }

    //hash password
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
    });
    return { _id: user._id };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      //disabled password
      .select('-password')
      .sort(sort as any);
    return { results, totalPages };
  }

  async findbyEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    const result = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );

    if (result.modifiedCount > 0) {
      return { message: 'User updated successfully' };
    } else {
      throw new BadRequestException('User updated failed');
    }
  }

  async remove(_id: string) {
    //check id
    if (mongoose.isValidObjectId(_id)) {
      const result = await this.userModel.deleteOne({ _id });
      if (result.deletedCount > 0) {
        return { message: 'User deleted successfully' };
      } else {
        throw new NotFoundException(`User with id ${_id} not found`);
      }
    } else {
      throw new BadRequestException('Invalid id');
    }
  }
}
