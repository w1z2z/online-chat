import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesEntity } from './messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
