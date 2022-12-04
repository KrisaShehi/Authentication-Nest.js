import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUserByPassword(loginUser: LoginUserDto) {
        let user = await this.usersService.findOneByEmail(loginUser.email);
        console.log('user', user);
        
        if (user) {
            const isMatch = await bcrypt.compare(loginUser.password, user.password);

            if (!isMatch) throw new UnauthorizedException();

            return this.createJwtPayload(loginUser);
        } else {
            throw new UnauthorizedException();
        }
    }

    async validateUserByJwt(payload: any) {
        let user = await this.usersService.findOneByEmail(payload.email);

        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    createJwtPayload(user: any) {
        let data = {
            email: user.email,
        };

        let jwt = this.jwtService.sign(data);
        return {
            expiresIn: '10h',
            token: jwt,
        }
    }
}
