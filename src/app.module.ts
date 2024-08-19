import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { AuthenticationGuard } from './Common/Guards/authentication.guard';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './Common/Filters/http-exception.filter';
import { RequestController } from './modules/request/request.controller';
import { RequestService } from './modules/request/request.service';
import { RequestModule } from './modules/request/request.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/eventmanagment2'),
    AuthModule,
    RequestModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    RequestService,
  ],
  controllers: [RequestController],
})
export class AppModule {}
