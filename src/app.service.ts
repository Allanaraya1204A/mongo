import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prima.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService){

  }
  //metodo para listar los datos desde la bd usamos los metodos prisma
  async getUsers() {
    return this.prisma.user.findMany();
  }

  // usuario por id
  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  //crear usuario
  async createUser(userData: { email: string; name?: string }): Promise<User> {
    return this.prisma.user.create({ data: userData });
  }

  //editar usaria
  async updateUser(id: string, userData: { name?: string; email?: string }): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }
  //eliminar usaurip
  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  
}
