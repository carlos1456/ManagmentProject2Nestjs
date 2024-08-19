import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Public } from 'src/Common/Decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: LoginDto) {
    const { token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Signed successfully',
      token,
    };
  }
}
