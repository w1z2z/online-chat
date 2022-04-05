import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, map, Observable } from 'rxjs';

import { MessagesEntity } from './messages/messages.entity';
import { Message, RoomId } from './interfaces';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly msgRepository: Repository<MessagesEntity>,
  ) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('meeting')
  joinUserToMeeting(
    @MessageBody() data: RoomId,
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<any>> {
    client.join(data.roomId);
    this.server.to(data.roomId).emit('meeting', 'a new challenger approaches');
    return from(data.roomId).pipe(
      map(() => {
        return {
          event: 'meeting',
          data: data.roomId,
        };
      }),
    );
  }

  @SubscribeMessage('send-message')
  async handleMessage(client: Socket, payload: Message): Promise<void> {
    const newMessage = {
      id: payload.id,
      roomId: payload.roomId,
      currentUserName: payload.currentUserName,
      currentUserId: payload.currentUserId,
      recipientUserName: 'payload.recipientUserName',
      recipientUserId: 'payload.recipientUserId',
      message: payload.message,
      date: payload.date,
      token: payload.token,
    };

    const createNewMsg = await this.msgRepository.create(newMessage);
    const result = await this.msgRepository.save(createNewMsg);
    this.server.to(payload.roomId).emit('receive-message', result);
  }

  afterInit(server: Server) {
    // this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    // this.logger.log(`Client connected: ${client}`);
  }
}
