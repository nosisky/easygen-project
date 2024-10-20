import { Controller, Post, Body, Get, Query, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('validate-token')
  async validateToken(@Query('token') token: string) {
    return this.authService.validateToken(token);
  }

  @Get('user')
  async getUser(@Headers('authorization') authorization: string) {
    return this.authService.getUser(authorization);
  }
}
