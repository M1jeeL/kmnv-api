import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@prisma/client'; // Enum que tienes en Prisma
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // Si no hay roles definidos, se permite el acceso
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user; // Asumiendo que tienes el usuario en el request (por el middleware de JWT)

    // Verificamos si el usuario tiene uno de los roles permitidos
    return requiredRoles.some((role) => user['role'] === role);
  }
}
