import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../users/users.model";
import { UserRoleModel } from "./user-role.model";

interface RoleCreateAttrs {
  value: string,
  description: string,
}

@Table({ tableName: "role" })
export class RoleModel extends Model<RoleModel, RoleCreateAttrs> {

  @ApiProperty({ example: "1", description: "Уникальный id" })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({ example: "ADMIN", description: "Уникальный значение роли" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => UserModel, () => UserRoleModel)
  users: UserModel[];
}