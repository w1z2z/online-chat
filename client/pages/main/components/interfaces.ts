export interface UserCardProps {
  id: string,
  name: string,
  surname: string,
  color: string,
  key?: any,
}

export interface GroupList {
  id: string,
  name: string,
  usersId?: string,
}
