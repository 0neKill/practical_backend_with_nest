import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { PostModel } from "./post.model";
import { FilesService } from "../files/files.service";

@Injectable()
export class PostsService {

  private filesService: FilesService;

  constructor(
    @InjectModel(PostModel)
    private postModel: typeof PostModel,
    filesService: FilesService
  ) {
    this.filesService = filesService;
  }

  async getAll() {
    return await this.postModel.findAll({
      include:{all:true}
    });
  }

  async createPost(dto: CreatePostDto, image: File, userId: number) {
    console.log(dto);
    const fileName = await this.filesService.createFile(image)
    return await this.postModel.create({ ...dto, image: fileName, userId: userId });
  }
}
