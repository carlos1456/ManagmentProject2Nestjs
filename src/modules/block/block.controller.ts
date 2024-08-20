import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { AuthService } from '../auth/auth.service';
import { AuthenticationGuard } from 'src/Common/Guards/authentication.guard';
import { Role } from 'src/Common/Enums/roles.enum.';
import { Roles } from 'src/Common/Decorators/roles.decorator';
import { BlockUnblocktToggleDTO } from './dto/blockunblocktoggle.dto';
import { UserExistingGuard } from 'src/Common/Guards/user-Exist.guard';

@Controller('api/user/block')
@UseGuards(AuthenticationGuard, UserExistingGuard)
@Roles(Role.User)
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post('blockunblocktoggle')
  async blockunblockHandler(
    @Req() request: Request,
    @Body() blockUnblocktoggleDTO: BlockUnblocktToggleDTO,
  ) {
    const userid = request['user']['sub'];
    const obj = this.blockService.blockunblockToggle(
      blockUnblocktoggleDTO,
      userid,
    );
    return {
      statusCode: HttpStatus.OK,
      message: `user ${blockUnblocktoggleDTO.status ? 'Blocked' : 'Unblocked'}  successfully`,
      data: obj,
    };
  }
}
