import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class MessagesEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  roomId: string;

  @Column()
  currentUserId: string;

  @Column()
  currentUserName: string;

  @Column()
  recipientUserId: string;

  @Column()
  recipientUserName: string;

  @Column()
  message: string;

  @Column()
  date: Date;
}
