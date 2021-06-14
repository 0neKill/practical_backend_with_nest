import { Body, Controller, Get, Post, Query, UseGuards, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto} from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserModel } from "./users.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  private userService: UsersService;

  constructor(userService: UsersService) {
    this.userService = userService;
  }

  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: UserModel })
  @UsePipes(ValidationPipe)
  @Post("/create")
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }


  @ApiOperation({ summary: "Получение пользователей" })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("/")
  getAllUser() {
    return this.userService.getAllUsers();
  }


  @ApiOperation({ summary: "Выдать роль" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Выдать бан" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/ban")
  setBan(@Body() dto: BanUserDto) {
    return this.userService.setBan(dto);
  }

}
