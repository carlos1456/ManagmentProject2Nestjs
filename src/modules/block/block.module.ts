import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BlockUnBlockToggle,
  BlockUnBlockToggleSchema,
} from './schemas/block-user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlockUnBlockToggle.name, schema: BlockUnBlockToggleSchema },
    ]),
    UserModule,
  ],
  providers: [BlockService],
  controllers: [BlockController],
  exports: [BlockService],
})
export class BlockModule {}
