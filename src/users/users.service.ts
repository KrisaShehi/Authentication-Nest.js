import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './user.schema';
import { User } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private userModel: Model<UserDocument> 
    ) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel({
            email: createUserDto.email,
            password: hashedPassword,
        });
        createdUser.save();
        return createdUser;
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }
}
