import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { UserModel } from "../users/users.model";

@Injectable()
export class AuthService {
  private userService: UsersService;
  private jwtService: JwtService;

  constructor(userService: UsersService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw  new HttpException("Пользователь уже создан с таким email", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcryptjs.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  private async generateToken(user: UserModel) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles
    };
    return {
      token: this.jwtService.sign(payload)
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) throw new UnauthorizedException("Логин неверный");
    const passwordEquals = await bcryptjs.compare(userDto.password, user.password);
    if (!passwordEquals) throw new UnauthorizedException("Пароль неверный");
    return user;
  }
}
