import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/schema.user';
import { UserService } from './user.service';
import { LoggerMiddleware } from '../../Common/middleware/logger.middleware';
import { HashPasswordInterceptor } from '../../Common/Interceptors/hash-password.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes(UserController);
  // }
}
