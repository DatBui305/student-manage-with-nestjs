import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return this.authService.register(username, password);
  }

  @Post('login')
  async login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return this.authService.login(username, password);
  }
}
