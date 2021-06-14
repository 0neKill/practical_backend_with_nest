import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { RoleModel } from "../roles/roles.model";
import { UserRoleModel } from "../roles/user-role.model";
import { PostModel } from "../posts/post.model";

interface UserCreationAttrs {
  email: string,
  password: string;
}

@Table({ tableName: "user" })
export class UserModel extends Model<UserModel, UserCreationAttrs> {

  @ApiProperty({ example: "1", description: "Уникальный id" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true })
  id: number;

  @ApiProperty({ example: "user@bk.ru", description: "Email пользователя" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "123123", description: "Пароль пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "true", description: "Забанен или нет" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  banned: boolean;

  @ApiProperty({ example: "Нарушение правил", description: "Причина бана" })
  @Column({ type: DataType.STRING, allowNull: true })
  banReasons: string;

  @BelongsToMany(() => RoleModel, () => UserRoleModel)
  roles: RoleModel[];

  @HasMany(() => PostModel)
  posts: Array<PostModel>;
}