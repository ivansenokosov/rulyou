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
    return { success: true, result: { users: [result] } };
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
    return { success: true, result: { users: result } };
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
    const user = await this.prisma.user.update({
      data: dto,
      where: { id: id },
    });

    return { success: true, result: user };
  }

  async delete(where: Prisma.UserWhereUniqueInput) {
    const result = await this.prisma.user.delete({
      where,
    });
    return { success: true, result };
  }

  async deleteAll() {
    await this.prisma.user.deleteMany();
    return { success: true };
  }
}
