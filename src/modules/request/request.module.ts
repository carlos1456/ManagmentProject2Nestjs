// src/modules/request/request.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RequestSchema, Request } from './schemas/request';
import { UserModule } from '../user/user.module';
import { BlockModule } from '../block/block.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
    UserModule,
    BlockModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
