import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessagesService} from "./messages.service";
import {MessagesController} from "./messages.controller";
import {MessagesEntity} from "./messages.entity";
import {UsersEntity} from "../users/users.entity";
import {UsersService} from "../users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), TypeOrmModule.forFeature([MessagesEntity])],
  providers: [MessagesService, UsersService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessageModule {}
