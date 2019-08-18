import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Delete,
  Request,
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "@nestjs/passport";
import {UserRole} from "@package/types";
import {DeleteResult} from "typeorm";
import {UsersService} from "./users.service";
import {AvatarsService} from "../avatars/avatars.service";
import {UsersEntity} from "./users.entity";
import {AvatarsEntity} from "../avatars/avatars.entity";
import {File, fileFilter} from "./users.utils";
import {createUserSchema, createWatcherSchema} from "./schemas";
import {createAvatarSchema} from "../avatars/schemas";
import {JoiValidationPipe} from "../pipes/joi.validation";
import {Roles} from "../guards/roles.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly avatarsService: AvatarsService) {}

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  public findAll(): Promise<Array<UsersEntity>> {
    return this.usersService.findAll();
  }

  @Post("/")
  public signup(@Body(new JoiValidationPipe(createUserSchema)) body: any): Promise<UsersEntity> {
    return this.usersService.create(body, null);
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  public findOne(@Param("id") id: number): Promise<UsersEntity | undefined> {
    return this.usersService.findById(id);
  }

  @Post("/watcher")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer)
  public createWatcher(
    @Request() req: any,
    @Body(new JoiValidationPipe(createWatcherSchema)) body: any,
  ): Promise<UsersEntity> {
    return this.usersService.create(body, req.user.id);
  }

  @Delete("/watcher/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer)
  public deleteWatcher(@Request() req: any, @Param("id") id: number): Promise<DeleteResult> {
    return this.usersService.delete(id, req.user.id);
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
