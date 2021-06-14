import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostModel } from "./post.model";
import { UserModel } from "../users/users.model";
import { AuthModule } from "../auth/auth.module";
import { FilesModule } from "../files/files.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([PostModel, UserModel]),
    AuthModule,
    FilesModule
  ]
})
export class PostsModule {
}
