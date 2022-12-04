import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {}

    @Post('register')
    async create(
        @Body() createUserDto: CreateUserDto,
    ) {
        return await this.usersService.create(createUserDto);
    }

    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute() {
        return {
            message: 'You did it!',
        }
    }
}
