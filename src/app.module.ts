import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { RequestModule } from './modules/request/request.module';
import { UserModule } from './modules/user/user.module';
import { BlockModule } from './modules/block/block.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './Common/Filters/http-exception.filter';
import { AuthenticationGuard } from './Common/Guards/authentication.guard';
import { ChatModule } from './modules/chat/chat.module';
import { WebsocketService } from './modules/websocket/websocket.service';
import { WebsocketController } from './modules/websocket/websocket.controller';
import { WebsocketModule } from './modules/websocket/websocket.module';

import config from './config/configration';
@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal:true,
        load:config
      }
    ),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('DATABASE_CONFIG');
        return {
          uri: databaseConfig.getDatabaseUrl(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    AuthModule,
    UserModule,
    RequestModule,
    BlockModule,
    ChatModule,
    WebsocketModule,
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
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    WebsocketService,
  ],
  controllers: [WebsocketController],
})
export class AppModule {}
