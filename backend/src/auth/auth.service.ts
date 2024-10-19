import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersService.create({ name, email, password: hashedPassword });
    this.logger.log(`User ${email} signed up successfully.`);
    return { message: 'User registered successfully' };
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; message: string }> {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      this.logger.log(`User ${email} signed in successfully.`);
      return { accessToken: token, message: 'User signed in successfully' };
    } else {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
