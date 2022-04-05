import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoomsEntity } from './rooms.entity';
import { GroupData, RoomData } from './interfaces';
import { AuthorizationEntity } from '../authorization/authorization.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsEntity)
    private readonly roomsRepository: Repository<RoomsEntity>,
    @InjectRepository(AuthorizationEntity)
    private readonly usersRepository: Repository<AuthorizationEntity>,
  ) {}

  async connectToRoom(roomData: RoomData): Promise<any> {
    if (roomData.currentUserId && roomData.recipientUserId) {
      const ids = [roomData.currentUserId, roomData.recipientUserId].sort();
      const findDuplicateRoom = await this.roomsRepository
        .createQueryBuilder('rooms')
        .where('rooms.usersId = :ids', {
          ids: `${ids[0]},${ids[1]}`,
        })
        .getOne();
      if (findDuplicateRoom) {
        return findDuplicateRoom.id;
      } else {
        const newRoom = {
          usersId: `${ids[0]},${ids[1]}`,
          name: 'private',
        };
        const room = await this.roomsRepository.create(newRoom);
        await this.roomsRepository.save(room);
        return room.id;
      }
    } else {
      const groupData = await this.roomsRepository.findOne({
        where: { id: roomData.groupId },
      });
      const usersId = groupData.usersId.split(',');
      const responseData = [];
      for (let i = 0; i < usersId.length; i++) {
        const userData = await this.usersRepository.findOne({
          where: { id: usersId[i] },
        });
        const parseUserData = {
          id: userData.id,
          name: userData.name,
          surname: userData.surname,
          color: userData.color,
        };
        responseData.push(parseUserData);
      }
      const otherUser = await this.usersRepository
        .createQueryBuilder('users')
        .select(['users.name', 'users.surname', 'users.id', 'users.color'])
        .where('users.id NOT IN (:...ids)', {
          ids: responseData.map((el) => {
            return el.id;
          }),
        })
        .getMany();
      return {
        id: groupData.id,
        name: groupData.name,
        usersData: responseData,
        otherUser: otherUser,
      };
    }
  }

  async createGroupChat(groupData: GroupData): Promise<RoomsEntity> {
    const ids = groupData.usersId.sort();
    const findDuplicateGroup = await this.roomsRepository.findOne({
      where: { usersId: `${ids}` },
    });
    if (findDuplicateGroup) {
      return findDuplicateGroup;
    } else {
      const newGroup = {
        usersId: `${ids}`,
        name: `${groupData.name} group`,
      };
      const group = this.roomsRepository.create(newGroup);
      await this.roomsRepository.save(group);
      return group;
    }
  }

  async editGroupChat(groupData: GroupData): Promise<RoomsEntity> {
    console.log(groupData);
    const editingGroup = await this.roomsRepository.findOne({
      where: { id: groupData.groupId },
    });
    const ids =
      groupData?.newMember.length > 0
        ? `${editingGroup.usersId},${groupData.newMember}`
        : editingGroup.usersId;
    if (editingGroup) {
      const newDataGroup = {
        id: editingGroup.id,
        name: groupData.newName,
        usersId: ids,
      };
      await this.roomsRepository.save(newDataGroup);
      const group = await this.roomsRepository.findOne({
        where: { id: newDataGroup.id },
      });

      return {
        id: group.id,
        name: group.name,
        usersId: group.usersId,
      };
    } else {
      console.log(1111);
    }
  }

  async getAllGroups(userId: string): Promise<GroupData[]> {
    const groups = [];
    const allGroups = await this.roomsRepository
      .createQueryBuilder('rooms')
      .select('rooms')
      // .where('usersId IN (:ids)', {
      //   ids: userId,
      // })
      .getMany();
    allGroups.forEach((el) => {
      if (el.usersId.includes(userId) && el.name != 'private') {
        groups.push(el);
      }
    });
    return groups;
  }
}
