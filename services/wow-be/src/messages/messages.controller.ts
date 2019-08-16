import {Controller, Get, UseGuards, Post, Param, Body, Request, Delete, Put} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {DeleteResult} from "typeorm";
import {MessagesService} from "./messages.service";
import {MessagesEntity} from "./messages.entity";
import {JoiValidationPipe} from "../pipes/joi.validation";
import {createMessageSchema, updateMessageSchema} from "./schemas";
import {Roles} from "../guards/roles.decorator";
import {UserRole} from "@package/types";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get("/dialog/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer, UserRole.Influencer)
  public getDialog(@Request() req: any, @Param("id") id: number): Promise<Array<MessagesEntity>> {
    return this.messagesService.findAll(req.user.id, id);
  }

  @Post("/dialog/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer, UserRole.Influencer)
  public createDialog(
    @Request() req: any,
    @Param("id") id: number,
    @Body(new JoiValidationPipe(createMessageSchema)) body: any,
  ): Promise<MessagesEntity> {
    return this.messagesService.create(req.user.id, id, body, req.user.role);
  }

  @Delete("/dialog/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer, UserRole.Influencer)
  public deleteDialog(@Request() req: any, @Param("id") id: number): Promise<DeleteResult> {
    return this.messagesService.deleteDialog(req.user.id, id);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer, UserRole.Influencer)
  public delete(@Request() req: any, @Param("id") id: number): Promise<DeleteResult> {
    return this.messagesService.delete(req.user.id, id);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer, UserRole.Influencer)
  public edit(
    @Request() req: any,
    @Param("id") id: number,
    @Body(new JoiValidationPipe(updateMessageSchema)) body: any,
  ): Promise<MessagesEntity | undefined> {
    return this.messagesService.update(req.user.id, id, body);
  }
}
