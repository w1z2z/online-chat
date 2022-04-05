import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthorizationEntity } from '../authorization/authorization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorizationEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
