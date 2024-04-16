import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async signIn(
    @Body() signInDto: Record<string, any>,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto.email, signInDto.pass);
  }
}
