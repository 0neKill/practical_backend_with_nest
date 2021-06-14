import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserModel } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

  private roleService: RolesService;

  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    roleService: RolesService
  ) {
    this.roleService = roleService;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    return await this.userModel.findAll({
      include: {
        all: true
      }
    });
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ where: { email }, include: { all: true } });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add("roles", role.id);
      return dto;
    }
    throw new HttpException("Ползователь или роль не найдены", HttpStatus.NOT_FOUND);
  }

  async setBan(dto: BanUserDto) {
    const user = await this.userModel.findByPk(dto.userId);
    if (!user) throw new HttpException("Ползователь не найдены", HttpStatus.NOT_FOUND);
    user.banned = true;
    user.banReasons = dto.banReasons;
    await user.save();
  }
}