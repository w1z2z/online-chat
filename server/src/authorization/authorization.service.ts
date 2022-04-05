import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthorizationEntity } from './authorization.entity';
import genTokenPair from '../middleware/genTokenPair';
import { verifyToken } from '../middleware/jwtMiddleware';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
}

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(AuthorizationEntity)
    private readonly usersRepository: Repository<AuthorizationEntity>,
  ) {}

  async registration(
    registerData: AuthorizationEntity,
  ): Promise<AuthorizationEntity> {
    const findDuplicateEmail = await this.usersRepository.find({
      where: { email: registerData.email },
    });

    if (findDuplicateEmail.length !== 0) {
      throw new BadRequestException({
        key: 'User with this email already exist',
      });
    }
    const hash = await bcrypt.hash(registerData.password, 5);
    const newUser = {
      email: registerData.email,
      password: hash,
      name: registerData.name,
      surname: registerData.surname,
      color: registerData.color,
    };
    const createNewUser = await this.usersRepository.create(newUser);
    return this.usersRepository.save(createNewUser);
  }

  async login(loginData: AuthorizationEntity): Promise<LoginResponse> {
    const findRegisteredUser = await this.usersRepository.find({
      where: { email: loginData.email },
    });
    if (findRegisteredUser.length !== 0) {
      const validPassword = bcrypt.compareSync(
        loginData.password,
        findRegisteredUser[0].password,
      );
      if (validPassword) {
        const tokenPair = genTokenPair(findRegisteredUser[0].id);
        const { accessToken, refreshToken } = tokenPair;
        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          userId: findRegisteredUser[0].id,
          userName: `${findRegisteredUser[0].name} ${findRegisteredUser[0].surname}`,
        };
      } else {
        throw new BadRequestException({ key: 'Invalid password!' });
      }
    } else {
      throw new BadRequestException({ key: 'Invalid email!' });
    }
  }

  async refresh(token: string): Promise<string[]> {
    const validToken = verifyToken(token);
    if (validToken) {
      const tPair = genTokenPair(validToken.id);
      return [tPair.accessToken, tPair.refreshToken];
    } else {
      return ['403'];
    }
  }
}
