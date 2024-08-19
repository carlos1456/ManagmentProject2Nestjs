import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/dto.createuser';
import { UserService } from './user.service';
import { HashPasswordInterceptor } from '../../Common/Interceptors/hash-password.interceptor';
import { Public } from 'src/Common/Decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @Public()
  @UseInterceptors(HashPasswordInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    const { token, newuser } = await this.userService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: newuser,
      token,
    };
  }
}
