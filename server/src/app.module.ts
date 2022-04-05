import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { AuthorizationModule } from './authorization/authorization.module';
import { UsersModule } from './users/users.module';
import ormconfig from './ormconfig';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesEntity } from './messages/messages.entity';
import { MessagesModule } from './messages/messages.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([MessagesEntity]),
    TypeOrmModule.forRoot(ormconfig),
    AuthorizationModule,
    UsersModule,
    RoomsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
