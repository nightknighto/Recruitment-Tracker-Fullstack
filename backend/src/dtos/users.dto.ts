import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public name: string;

  @IsString()
  public password: string;

  @IsNumber()
  public phone: number;

  @IsString()
  public role: string;
}
