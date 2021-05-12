import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly isCompleted: boolean = false;
}
