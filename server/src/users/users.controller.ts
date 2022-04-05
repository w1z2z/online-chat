import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { verify } from '../middleware/virifyToken';
import { UserData, UserId } from '../interfaces';
import { AuthorizationEntity } from "../authorization/authorization.entity";
import { SearchedData } from "./interfaces";

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get('getAllUsers')
  getAllUsers(@Headers() token: object): Promise<UserData[]> {
    const ver = verify(token);
    if (ver) {
      return this.UsersService.getAllUsers(ver.id);
    } else {
      throw new UnauthorizedException({ key: 'Invalid token!' });
    }
  }

  @Post('getOneUserData')
  getOneUserData(
    @Headers() token: object,
    @Body() userId: UserId,
  ): Promise<UserData> {
    const ver = verify(token);
    if (ver) {
      return this.UsersService.getOneUserData(userId.userId);
    } else {
      throw new UnauthorizedException({ key: 'Invalid token!' });
    }
  }

  @Post('searchedUser')
  searchedUser(
    @Headers() token: object,
    @Body() searchedData: SearchedData,
  ): Promise<AuthorizationEntity[]> {
    const ver = verify(token);
    if (ver) {
      return this.UsersService.searchedUser(searchedData);
    } else {
      throw new UnauthorizedException({ key: 'Invalid token!' });
    }
  }
}
