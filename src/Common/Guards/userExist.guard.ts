import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class UserExistingGuard implements CanActivate {
  constructor(private readonly usersService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { recipientId } = request.body;

    if (!recipientId || !Types.ObjectId.isValid(recipientId)) {
      throw new BadRequestException(
        'Recipient ID is required and must be a valid ObjectId',
      );
    }
    const recipient = await this.usersService.findbyid(recipientId);

    if (!recipient) {
      throw new NotFoundException('User not found');
    }

    return true;
  }
}
