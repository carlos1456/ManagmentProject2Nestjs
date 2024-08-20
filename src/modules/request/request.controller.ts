import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationGuard } from 'src/Common/Guards/authorization.guard';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestService } from './request.service';
import { Roles } from '../../Common/Decorators/roles.decorator';
import { Role } from 'src/Common/Enums/roles.enum.';
import { Public } from 'src/Common/Decorators/public.decorator';
import { Types } from 'mongoose';
import { UserExistingGuard } from 'src/Common/Guards/user-Exist.guard';
import { UpdateRequestDTO } from './dto/update-request-status.dto';
import { isBlockedGuard } from 'src/Common/Guards/already-block.guard';

@Controller('api/user/request')
@UseGuards(AuthorizationGuard)
@Roles(Role.User)
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('sendRequest')
  @UseGuards(UserExistingGuard, isBlockedGuard)
  async sendRequestHandler(
    @Req() request: Request,
    @Body() createRequestDto: CreateRequestDto,
  ) {
    const userid = request['user']['sub'];
    const obj = await this.requestService.sendRequest(createRequestDto, userid);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Request sent Suessfully successfully',
      data: obj,
    };
  }

  @Post('UpdateRequestStatus')
  async UpdateRequestStatusHandler(@Body() updateRequestDTO: UpdateRequestDTO) {
    const obj = await this.requestService.updateRequestStatus(updateRequestDTO);

    return {
      statusCode: HttpStatus.OK,
      message: `request ${updateRequestDTO.status}  successfully`,
      data: obj,
    };
  }
}
