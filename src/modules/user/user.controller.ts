import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { HashPasswordInterceptor } from '../../Common/Interceptors/hash-password.interceptor';
import { Public } from 'src/Common/Decorators/public.decorator';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @Public()
  @UseInterceptors(HashPasswordInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    const { token, createduser } = await this.userService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: createduser,
      token,
    };
  }
}
