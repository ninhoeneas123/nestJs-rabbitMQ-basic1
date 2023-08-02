import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto);
  }

  @Get('get-all')
  getAll() { 
    return this.usersService.getAll();
  }


  @UseGuards(AuthGuard)
  @Get('get-by-id/:id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }


  @UseGuards(AuthGuard)
  @Get('get-by-email')
    getByEmail(@Body() body: { email: string }) {
    return this.usersService.getByEmail(body.email);
  }


  @UseGuards(AuthGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }


  @UseGuards(AuthGuard)
  @Get('teste')
  teste() {
    return 'teste';
  }
}




