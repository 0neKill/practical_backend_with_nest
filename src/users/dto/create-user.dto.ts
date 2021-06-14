import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "user@bk.ru", description: "Уникальный email" })
  @IsString({ message: "Должен быть строка" })
  @IsEmail({}, { message: "Неккоректный email" })
  readonly email: string;

  @ApiProperty({ example: "11231231", description: "Пароль пользователя" })
  @IsString({ message: "Должен быть строкой" })
  @Length(4, 16, { message: "Не должно быть меньше 4 и больше 16" })
  readonly password: string;
}