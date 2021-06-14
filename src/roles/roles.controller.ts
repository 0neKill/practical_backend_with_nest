import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/CreateRoleDto";
import { RoleModel } from "./roles.model";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {

  private roleService: RolesService;

  constructor(roleService: RolesService) {
    this.roleService = roleService;
  }

  @ApiOperation({ summary: "Создание роли" })
  @ApiResponse({ status: 200, type: RoleModel })
  @Post("/")
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: "Получение роли по уникальному значению" })
  @ApiResponse({ status: 200, type: RoleModel })
  @ApiParam({ name: "value", example: "ADMIN", description: "Уникальное значение роли" })
  @Get("/:value")
  getByValueRole(
    @Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
