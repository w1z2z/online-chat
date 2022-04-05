import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { AuthorizationEntity } from './authorization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorizationEntity])],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
