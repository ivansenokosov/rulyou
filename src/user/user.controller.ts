import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { PatchUserDto } from './dto/patchUser.dto';
import { FindOneParams } from './dto/param.dto';

@Controller('')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  // Create
  @Post('create')
  async createUserInvConfig(@Body() dto: CreateUserDto) {
    const result = await this.UserService.create(dto);
    console.log('result', result);
    return result;
  }

  // Patch
  @Patch('update/:id')
  @UsePipes(new ValidationPipe({ groups: ['patch'] }))
  async updateUser(
    @Body()
    dto: PatchUserDto,
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
  async getAll(@Query() query) {
    if (Object.keys(query).length > 0)
      if (query.role)
        return this.UserService.all({
          where: { role: query.role },
        });
      else return { success: false, result: { error: 'Ошибочный запрос' } };
    else return this.UserService.all({});
  }

  // Get one
  @Get('get/:id')
  async get(@Param() params: FindOneParams) {
    return this.UserService.get({ id: Number(params.id) });
  }
}
