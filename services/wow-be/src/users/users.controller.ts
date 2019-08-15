import {Controller, Get, Param, Post, UseInterceptors, UploadedFile, Body} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
// import {UseGuards} from "@nestjs/common";
// import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "./users.service";
import {AvatarsService} from "../avatars/avatars.service";
import {UsersEntity} from "./users.entity";
import {AvatarsEntity} from "../avatars/avatars.entity";
import {fileFilter, File} from "./users.utils";

// @UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly avatarsService: AvatarsService) {}

  @Get("/")
  public findAll(): Promise<Array<UsersEntity>> {
    return this.usersService.findAll();
  }

  @Get("/:id")
  public findOne(@Param("id") id: number): Promise<UsersEntity | undefined> {
    return this.usersService.findById(id);
  }

  @Post("/:id/avatar")
  @UseInterceptors(
    FileInterceptor("avatar", {
      fileFilter,
    }),
  )
  public avatar(@Param("id") id: number, @UploadedFile() file: File, @Body() body: any): Promise<AvatarsEntity> {
    return this.avatarsService.update(id, file, body);
  }
}
