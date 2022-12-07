import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from './user.schema';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [UsersService],
  providers: [UsersService, PrismaService],
  controllers: [UsersController]
})
export class UsersModule {}
