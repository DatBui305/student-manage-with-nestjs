import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    console.log('👮 Checking roles...');
    if (!requiredRoles) {
      console.log('✅ No roles required');
      return true;
    }

    console.log('🎯 Required roles:', requiredRoles);

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      console.log('❌ No authorization header');
      return false;
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.decode(token) as any;
      console.log('🔑 Decoded token:', decoded);
      console.log('👤 User role:', decoded.role);

      const hasRole = requiredRoles.includes(decoded.role);
      console.log(hasRole ? '✅ Access granted' : '❌ Access denied');

      return hasRole;
    } catch (error) {
      console.error('❌ Token validation failed:', error.message);
      return false;
    }
  }
}
