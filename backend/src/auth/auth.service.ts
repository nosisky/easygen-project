import {
  Injectable,
  UnauthorizedException,
  Logger,
  InternalServerErrorException,
  ConflictException,
  HttpException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type User = { email: string; password: string; _id?: string };
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    try {
      const { name, email, password } = signUpDto;

      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email is already registered');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.usersService.create({ name, email, password: hashedPassword });
      this.logger.log(`User signed up successfully.`);
      return { message: 'User registered successfully' };
    } catch (error) {
      this.logger.error(`Error signing up user: ${error}`);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while signing up',
      );
    }
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; message: string; user: any }> {
    const { email, password } = signInDto;

    try {
      const user: User | undefined = await this.usersService.findByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload = { email: user.email, sub: user._id };
        const token = this.jwtService.sign(payload, {
          expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        });
        this.logger.log(`User signed in successfully.`);
        delete user.password;

        return {
          accessToken: token,
          message: 'User signed in successfully',
          user: user,
        };
      } else {
        this.logger.warn(`Failed login attempt for email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (error) {
      this.logger.error(`Error signing in user: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while signing in',
      );
    }
  }

  async validateToken(
    token: string,
  ): Promise<{ userId: string; success: boolean }> {
    try {
      const decoded = this.jwtService.verify(token);
      const user: User | undefined = await this.usersService.findByEmail(
        decoded.email,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return { success: true, userId: user._id };
    } catch (error) {
      this.logger.warn(`Invalid token attempted`, error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUser(authorization: string): Promise<any> {
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    return this.usersService.findByEmail(decoded.email, true);
  }
}
