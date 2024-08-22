import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { HashPasswordInterceptor } from '../../Common/Interceptors/hash-password.interceptor';
import { Public } from 'src/Common/Decorators/public.decorator';

import { User } from './schemas/schema.user';
import { ParseIntPipes } from 'src/Common/pipes/custim-pipe';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @Public()
  @UseInterceptors(HashPasswordInterceptor)
  async create(@Body() createUserDto: CreateUserDto, @Req() request:Request) {
    console.log(request)
    const { token, createduser } = await this.userService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: createduser,
      token,
    };
  }

  @Get('getbyid/:id')
  @UsePipes(ParseIntPipes)
  async getUser(@Param('id') id: number) {
    console.log('User ID:', id);
    // Your logic to fetch and return the user by ID
  }
}
