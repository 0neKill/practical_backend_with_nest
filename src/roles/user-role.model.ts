import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "../users/users.model";
import { RoleModel } from "./roles.model";


@Table({ tableName: "user_role", createdAt: false, updatedAt: false })
export class UserRoleModel extends Model<UserRoleModel> {

  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

}