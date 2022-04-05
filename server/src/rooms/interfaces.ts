import { UserData } from '../interfaces';

export interface GroupData {
  usersId: Array<string>;
  name: string;
}

export interface RoomData {
  currentUserId?: string;
  recipientUserId?: string;
  groupId?: string;
}

export interface GroupData {
  groupId: string;
  newName: string;
  newMember: UserData[];
}