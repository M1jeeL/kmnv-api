import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { UpdateUserDto } from './dto';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Listar usuarios (accesible solo para administradores)
  @Get()
  @Roles(UserRole.ADMIN)
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('role') role?: UserRole,
  ) {
    return this.usersService.findAll(page, limit, role);
  }

  // Ver detalles de un usuario
  @Get(':id')
  @Roles(UserRole.ADMIN)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Crear un nuevo usuario (solo accesible para administradores)
  @Post()
  @Roles(UserRole.ADMIN)
  async createUser(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
    },
  ) {
    return this.usersService.createUser(body);
  }

  // Actualizar un usuario (solo accesible para administradores)
  @Put(':id')
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // Eliminar un usuario (solo accesible para administradores)
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
