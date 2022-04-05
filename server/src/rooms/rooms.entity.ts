import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AuthorizationEntity } from '../authorization/authorization.entity';

@Entity({ name: 'rooms' })
export class RoomsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('simple-array')
  // usersId: string[];
  @Column()
  usersId: string;

  @Column()
  name: string;
}
