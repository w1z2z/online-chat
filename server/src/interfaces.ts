export interface Message {
  id: string;
  dialog: string;
  currentUserName: string;
  currentUserId: string;
  recipientUserName: string;
  recipientUserId: string;
  message: string;
  date: Date;
  roomId: string;
  token?: string;
}

export interface RoomId {
  roomId: string;
}

export interface UserId {
  userId: string;
}

export interface UserData {
  id: string;
  name: string;
  surname: string;
  color: string;
}
