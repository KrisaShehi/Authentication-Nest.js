import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './user.schema';
// import { User } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {

    constructor(
        // @InjectModel('User') private userModel: Model<UserDocument> 
        private prisma: PrismaService
    ) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: hashedPassword,
            }
        });
    }

    async findOneByEmail(userEmail: string): Promise<User> {
        return await this.prisma.user.findFirst({ where: { email: userEmail } })
    }
}
