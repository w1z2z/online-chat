import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { verify } from '../middleware/virifyToken';
import { RoomsService } from './rooms.service';
import { GroupData, RoomData } from './interfaces';
import { RoomsEntity } from './rooms.entity';
import { UserId } from '../interfaces';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('connectToRoom')
  connectToRoom(
    @Body() roomData: RoomData,
    @Headers() token: object,
  ): Promise<any> {
    const ver = verify(token);
    if (ver) {
      return this.roomsService.connectToRoom(roomData);
    } else {
      throw new UnauthorizedException({ key: 'Invalid token!' });
    }
  }

  @Post('createGroupChat')
  createGroupChat(
    @Body() groupData: GroupData,
    @Headers() token: object,
  ): Promise<any> {
    const ver = verify(token);
    if (ver) {
      return this.roomsService.createGroupChat(groupData);
    } else {
      throw new UnauthorizedException({ key: 'Invalid token!' });
    }
  }

  @Post('editGroupChat')
  editGroupChat(
    @Body() groupData: GroupData,
    @Headers() token: object,
  ): Promise<RoomsEntity> {
    const ver = verify(token);
    if (ver) {
      return this.roomsService.editGroupChat(groupData);
    } else {
      throw new UnauthorizedException({ key: 'Invalid token!' });
    }
  }

  @Post('getAllGroups')
  getAllGroups(
    @Body() userId: UserId,
    @Headers() token: object,
  ): Promise<GroupData[]> {
    const ver = verify(token);
    if (ver) {
      return this.roomsService.getAllGroups(userId.userId);
    } else {
      throw new UnauthorizedException({ key: 'Invalid token!' });
    }
  }

  // @Post('getGroupData')
  // getGroupData(@Body() groupId: any, @Headers() token: object): Promise<any> {
  //   const ver = verify(token);
  //   if (ver) {
  //     return this.roomsService.getGroupData(groupId.groupId);
  //   } else {
  //     throw new UnauthorizedException({ key: 'Invalid token!' });
  //   }
  // }
}
