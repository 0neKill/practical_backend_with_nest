import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RoleModel } from "./roles.model";
import { CreateRoleDto } from "./dto/CreateRoleDto";

@Injectable()
export class RolesService {

  constructor(
    @InjectModel(RoleModel)
    private roleModel: typeof RoleModel
  ) {
  }

  async createRole(dto: CreateRoleDto) {
    console.log(dto);
    return await this.roleModel.create(dto);
  }

  async getRoleByValue(value: string) {
    return await this.roleModel.findOne({ where: { value } });
  }


}
