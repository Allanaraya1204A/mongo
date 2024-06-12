import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private appService: AppService) { }

  @Get('/users')
  getUsers() {
    return this.appService.getUsers();
  }
  @Get('/users/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.appService.getUserById(id);
  }
  @Post('/users')
  async createUser(@Body() userData: { email: string; name?: string }): Promise<User> {
    return this.appService.createUser(userData);
  }

  @Put('/users/:id')
  async updateUser(@Param('id') id: string, @Body() userData: { name?: string; email?: string }): Promise<User> {
    const updatedUser = await this.appService.updateUser(id, userData);
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return updatedUser;
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const message = await this.appService.deleteUser(id);
    res.status(200).json({ message });
  }

}
