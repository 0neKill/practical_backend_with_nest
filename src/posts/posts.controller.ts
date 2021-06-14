import {Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserModel } from "../users/users.model";
import { FileInterceptor } from "@nestjs/platform-express";


interface IRequest {
  body: CreatePostDto,
  user: UserModel
}

@Controller("posts")
export class PostsController {

  private postService: PostsService;

  constructor(postService: PostsService) {
    this.postService = postService;
  }

  @Get('/')
  getAll() {
    return this.postService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post("/")
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Req() req: any, @UploadedFile() image) {
    return this.postService.createPost(req.body, image, req.user.id);
  }


}
