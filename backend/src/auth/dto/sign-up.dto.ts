import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Minimum length of 8 characters' })
  @Matches(/[a-zA-Z]/, { message: 'At least one letter' })
  @Matches(/\d/, { message: 'At least one number' })
  @Matches(/[^a-zA-Z0-9]/, { message: 'At least one special character' })
  password: string;
}

