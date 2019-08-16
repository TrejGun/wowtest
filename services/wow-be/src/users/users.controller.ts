import {Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, Delete} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "@nestjs/passport";
import {User} from "@package/types";
import {UsersService} from "./users.service";
import {AvatarsService} from "../avatars/avatars.service";
import {UsersEntity} from "./users.entity";
import {AvatarsEntity} from "../avatars/avatars.entity";
import {File, fileFilter} from "./users.utils";
import {createUserSchema} from "./schemas";
import {createAvatarSchema} from "../avatars/schemas";
import {JoiValidationPipe} from "../pipes/joi.validation";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly avatarsService: AvatarsService) {}

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  public findAll(): Promise<Array<UsersEntity>> {
    return this.usersService.findAll();
  }

  @Post("/")
  public signup(@Body(new JoiValidationPipe(createUserSchema)) body: User): Promise<UsersEntity> {
    return this.usersService.create(body);
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  public findOne(@Param("id") id: number): Promise<UsersEntity | undefined> {
    return this.usersService.findById(id);
  }

  @Post("/:id/avatar")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("avatar", {
      fileFilter,
    }),
  )
  public updateAvatar(
    @Param("id") id: number,
    @UploadedFile() file: File,
    @Body(new JoiValidationPipe(createAvatarSchema)) body: any,
  ): Promise<AvatarsEntity> {
    return this.avatarsService.update(id, file, body);
  }

  @Delete("/:id/avatar")
  @UseGuards(AuthGuard("jwt"))
  public deleteAvatar(@Param("id") id: number): Promise<AvatarsEntity | undefined> {
    return this.avatarsService.delete(id);
  }
}
