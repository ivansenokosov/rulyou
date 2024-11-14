import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import type { IGetResponse } from 'src/interfaces';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(
    postWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<IGetResponse | null> {
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
  }): Promise<IGetResponse> {
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

  async create(user: CreateUserDto) {
    await this.prisma.user
      .create({
        data: {
          full_name: user.full_name,
          role: user.role,
          efficiency: user.efficiency,
        },
        select: {
          id: true,
        },
      })
      .then((response) => {
        return { success: true, id: response.id };
      })
      .catch((error) => {
        return { success: false, result: { error: error } };
      });
  }

  async update(id: number, dto: CreateUserDto) {
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
