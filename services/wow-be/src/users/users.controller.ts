import {Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "@nestjs/passport";
import {User} from "@package/types";
import {UsersService} from "./users.service";
import {AvatarsService} from "../avatars/avatars.service";
import {UsersEntity} from "./users.entity";
import {AvatarsEntity} from "../avatars/avatars.entity";
import {File, fileFilter} from "./users.utils";
import {createUserSchema} from "./schemas";
import {JoiValidationPipe} from "../pipes/joi.validation";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly avatarsService: AvatarsService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/")
  public findAll(): Promise<Array<UsersEntity>> {
    return this.usersService.findAll();
  }

  @Post("/")
  @UsePipes(new JoiValidationPipe(createUserSchema))
  public signup(@Body() body: User): Promise<UsersEntity> {
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
  public avatar(@Param("id") id: number, @UploadedFile() file: File, @Body() body: any): Promise<AvatarsEntity> {
    return this.avatarsService.update(id, file, body);
  }
}
