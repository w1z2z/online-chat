import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthorizationService } from './authorization.service';
import { AuthorizationEntity } from './authorization.entity';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('reg')
  reg(@Body() regData: AuthorizationEntity): Promise<AuthorizationEntity> {
    return this.authorizationService.registration(regData);
  }

  @Post('log')
  log(@Body() loginData: AuthorizationEntity): Promise<object> {
    return this.authorizationService.login(loginData);
  }

  @Get('refresh')
  refresh(@Headers() token: any): Promise<string[]> {
    const refreshToken = token.authorization.split(' ')[1];
    return this.authorizationService.refresh(refreshToken);
  }
}
