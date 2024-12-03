import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Listar usuarios con paginación y filtro de roles
  async findAll(page: number = 1, limit: number = 10, role?: UserRole) {
    const skip = (page - 1) * limit;
    const where = role ? { role } : {};

    return this.prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { registrationDate: 'desc' },
    });
  }

  // Obtener detalles de un usuario
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Crear un nuevo usuario
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    return this.prisma.user.create({
      data,
    });
  }

  // Actualizar usuario
  async updateUser(
    id: string,
    data: { name?: string; email?: string; lastname?: string },
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Eliminar usuario (Soft delete, por ejemplo, cambiando su estado)
  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
