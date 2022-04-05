import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthorizationEntity } from '../authorization/authorization.entity';
import { UserData } from '../interfaces';
import { SearchedData } from "./interfaces";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(AuthorizationEntity)
    private readonly usersRepository: Repository<AuthorizationEntity>,
  ) {}

  async getAllUsers(id: string): Promise<UserData[]> {
    const allUsers = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.name', 'users.surname', 'users.id', 'users.color'])
      .where('users.id != :verifyId', { verifyId: id })
      .getMany();
    return allUsers;
  }

  async getOneUserData(userId: string): Promise<UserData> {
    const userData = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.name', 'users.surname', 'users.id', 'users.color'])
      .where('users.id = :verifyId', { verifyId: userId })
      .getOne();
    return userData;
  }

  async searchedUser(
    searchedData: SearchedData,
  ): Promise<AuthorizationEntity[]> {
    const searchedUser = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.name || users.surname Ilike :name', {
        name: `%${searchedData.userName}%`,
      })
      .andWhere('users.id != :currentUserId', {
        currentUserId: searchedData.currentUserId,
      })
      .getMany();
    return searchedUser;
  }
}
