import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MessagesEntity } from './messages.entity';
import { RoomId } from '../interfaces';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
  ) {}

  async getPrevMessage(roomId: RoomId): Promise<MessagesEntity[]> {
    try {
      return await this.messageRepository.find({
        where: { roomId: roomId.roomId },
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
