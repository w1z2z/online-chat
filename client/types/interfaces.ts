export interface Users {
  id: string,
  name: string,
  surname: string,
  email: string,
  password: string,
  passwordRepeat: string,
  color: string
}

export interface IMessage {
  id?: string,
  currentUserName: string,
  currentUserId?: string,
  recipientUserName?: string,
  recipientUserId?: string,
  message: string,
  date?: string,
  color?: string,
}

export type Name = {
  name: string,
}