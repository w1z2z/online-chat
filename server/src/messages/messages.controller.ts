import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { MessagesService } from './messages.service';
import { verify } from '../middleware/virifyToken';
import { MessagesEntity } from './messages.entity';
import { RoomId } from "../interfaces";

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post('getPrevMessage')
  getPrevMessage(
    @Body() roomId: RoomId,
    @Headers() token: any,
  ): Promise<MessagesEntity[]> {
    const ver = verify(token);
    if (ver) {
      return this.messageService.getPrevMessage(roomId);
    } else {
      throw new UnauthorizedException({ key: 'Invalid token!' });
    }
  }
}
