import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {DeleteResult} from "typeorm";
import {MessagesService} from "./messages.service";
import {MessagesEntity} from "./messages.entity";
import {CreateMessageSchema, UpdateMessageSchema} from "./schemas";
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
    @Body() body: CreateMessageSchema,
  ): Promise<MessagesEntity> {
    return this.messagesService.create(req.user.id, id, body, req.user.role);
  }

  @Delete("/dialog/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer, UserRole.Influencer)
  public deleteDialog(@Request() req: any, @Param("id") id: number): Promise<DeleteResult> {
    return this.messagesService.deleteDialog(req.user.id, id);
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer, UserRole.Influencer)
  public getMessage(@Request() req: any, @Param("id") id: number): Promise<MessagesEntity | undefined> {
    return this.messagesService.findOne(1 || req.user.id, id);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer, UserRole.Influencer)
  public deleteMessage(@Request() req: any, @Param("id") id: number): Promise<DeleteResult> {
    return this.messagesService.delete(req.user.id, id);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  @Roles(UserRole.Marketer, UserRole.Influencer)
  public editMessage(
    @Request() req: any,
    @Param("id") id: number,
    @Body() body: UpdateMessageSchema,
  ): Promise<MessagesEntity | undefined> {
    return this.messagesService.update(req.user.id, id, body);
  }
}
