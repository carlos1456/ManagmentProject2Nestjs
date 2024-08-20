// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AuthenticationGuard } from './Common/Guards/authentication.guard';
import { HttpExceptionFilter } from './Common/Filters/http-exception.filter';
import { RequestModule } from './modules/request/request.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/eventmanagment2'),
    AuthModule,
    UserModule,
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
  ],
  controllers: [],
})
export class AppModule {}
