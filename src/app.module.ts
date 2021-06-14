import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { UserModel } from "./users/users.model";
import { RolesModule } from "./roles/roles.module";
import { RoleModel } from "./roles/roles.model";
import { UserRoleModel } from "./roles/user-role.model";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { PostModel } from "./posts/post.model";
import { FilesModule } from "./files/files.module";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [ // Import нужен для того,чтобы подключать сторонни модули
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [UserModel, RoleModel, UserRoleModel, PostModel],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static")
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule
  ]
})
export class AppModule {

}