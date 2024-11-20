import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import type { IResponse } from 'src/interfaces';
import { PatchUserDto } from './dto/patchUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(
    postWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<IResponse | null> {
    const result = await this.prisma.user.findUnique({
      where: postWhereUniqueInput,
    });
    if (result) return { success: true, result: { users: [result] } };
    else return { success: false, result: { error: 'Ничего не найдено' } };
  }

  async all(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<IResponse> {
    const { skip, take, cursor, where, orderBy } = params;
    const result = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    console.log(where);
    if (result.length > 0) return { success: true, result: { users: result } };
    else return { success: false, result: { error: 'Ничего не найдено' } };
  }

  async create(user: CreateUserDto): Promise<IResponse> {
    let result: IResponse;
    try {
      const response = await this.prisma.user.create({
        data: {
          full_name: user.full_name,
          role: user.role,
          efficiency: user.efficiency,
        },
        select: {
          id: true,
        },
      });
      result = { success: true, result: { id: response.id } };
    } catch (error) {
      result = { success: false, result: { error: error } };
    }

    return result;
  }

  async update(id: number, dto: PatchUserDto) {
    try {
      const user = await this.prisma.user.update({
        data: dto,
        where: { id: id },
      });

      return { success: true, result: user };
    } catch (error) {
      console.log(error);
      return { success: false, result: { error: 'Пользователь не обновлён' } };
    }
  }

  async delete(where: Prisma.UserWhereUniqueInput) {
    try {
      const result = await this.prisma.user.delete({
        where,
      });
      return { success: true, result };
    } catch (error) {
      console.log(error);
      return { success: false, result: { error: 'Пользователь не найден' } };
    }
  }

  async deleteAll() {
    await this.prisma.user.deleteMany();
    return { success: true };
  }
}
