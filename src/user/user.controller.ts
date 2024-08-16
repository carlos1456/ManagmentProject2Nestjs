import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/DTO/dto.createuser';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Error creating user',
      }, HttpStatus.BAD_REQUEST, { cause: e });
    }
  }

  @Get()
  async findAll(@Req() request: Request) {
    try {
      return await this.userService.findAll();
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR, { cause: e });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        }, HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR, { cause: e });
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const result = await this.userService.deleteUser(id);
      if (!result) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        }, HttpStatus.NOT_FOUND);
      }
      return { message: 'User deleted successfully' };
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      }, HttpStatus.INTERNAL_SERVER_ERROR, { cause: e });
    }
  }
}
