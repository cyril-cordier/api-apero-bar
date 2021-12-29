import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthenticationGuardAdmin } from 'src/auth/authAdm.guard';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 409, description: 'username already exists, user not created' })
  @Post()
  @UseGuards(AuthenticationGuardAdmin)
  @ApiCreatedResponse({ description: 'user created' })
  async create(@Body() createUsersDto: CreateUsersDto) {
    const userExist:any = await this.usersService.findOneByUsername(createUsersDto.username);
    if (userExist.length > 0) {
      throw new HttpException('username already exists, user not created', HttpStatus.CONFLICT);
    } else {
      return this.usersService.create(createUsersDto);
    }
  }

  @Get()
  @UseGuards(AuthenticationGuardAdmin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthenticationGuardAdmin)
  async update(@Param('id') id: number, @Body() updateUsersDto: UpdateUsersDto) {
    const userExist:any = await this.usersService.findOneByUsername(updateUsersDto.username);
    if (userExist.length > 0 && userExist[0].id != id) {
      throw new HttpException('username already exists, user not updated', HttpStatus.CONFLICT);
    } else {
    return this.usersService.update(+id, updateUsersDto);
    }
  }

  @Put(":id/change-password")
  @UseGuards(AuthenticationGuardAdmin)
  @ApiOkResponse({ description: `Password successfully changed`
  })
  async changePassword(@Param('id') id: number, @Body() changePasswordDto: ChangePasswordDto) {

    const change = this.usersService.changePassword(id, changePasswordDto)
    return change;
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuardAdmin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
