import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/schemas/schema.user';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService:UserService){

    }
    async signIn(username: string,pass: string,): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(username);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user._id, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    
    
    }


