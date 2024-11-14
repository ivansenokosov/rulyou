import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { FindOneParams } from './dto/param.dto';

@Controller('')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  // Create
  @Post('create')
  async createUserInvConfig(@Body() dto: CreateUserDto) {
    return this.UserService.create(dto);
  }

  // Update
  @Put('update/:id')
  async updateUser(
    @Body()
    dto: CreateUserDto,
    @Param() params: FindOneParams,
  ) {
    return this.UserService.update(Number(params.id), dto);
  }

  // Delete one
  @Delete('delete/:id')
  async deleteOne(@Param() params: FindOneParams) {
    return this.UserService.delete({ id: Number(params.id) });
  }

  // Delete all
  @Delete('delete')
  async deleteAll() {
    return this.UserService.deleteAll();
  }

  // Get all
  @Get('get')
  async getAll(@Query('role') role: string) {
    return this.UserService.all({
      where: { role: role },
    });
  }

  // Get one
  @Get('get/:id')
  async get(@Param() params: FindOneParams) {
    return this.UserService.get({ id: Number(params.id) });
  }
}
