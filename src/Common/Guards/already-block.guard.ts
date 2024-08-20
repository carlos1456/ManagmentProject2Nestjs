import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { BlockService } from 'src/modules/block/block.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class isBlockedGuard implements CanActivate {
  constructor(private readonly blockService: BlockService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { recipientId } = request.body;
    const requesteriId = request['user']['sub'];
    const isBlocked = await this.blockService.isBlocked(
      recipientId,
      requesteriId,
    );  
    console.log(isBlocked);

    if (isBlocked) {
      throw new BadRequestException('Users have blocked each other');
    }

    return true;
  }
}
