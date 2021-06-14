import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "../users/users.model";

interface PostCreationAttrs {
  title: string,
  content: string,
  userId: number,
  image:string,
}

@Table({ tableName: "post" })
export class PostModel extends Model<PostModel, PostCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING})
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UserModel)
  author: UserModel;
}