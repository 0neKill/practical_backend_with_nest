import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoleModel } from "./roles.model";
import { UserModel } from "../users/users.model";
import { UserRoleModel } from "./user-role.model";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([RoleModel, UserModel, UserRoleModel])
  ],
  exports: [RolesService] //Указываем тут то,что хотим экспортить вместе с модулем
})
export class RolesModule {
}
