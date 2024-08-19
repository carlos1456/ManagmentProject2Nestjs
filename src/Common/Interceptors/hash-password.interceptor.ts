import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordInterceptor implements NestInterceptor {
  constructor() {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;
    if (body.password) {
      try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
      } catch (error) {
        throw new BadRequestException('Error hashing password');
      }
    }

    return next.handle();
  }
}
