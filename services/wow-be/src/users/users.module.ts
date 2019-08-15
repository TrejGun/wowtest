import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {UsersEntity} from "./users.entity";
import {AvatarsService} from "../avatars/avatars.service";
import {AvatarsEntity} from "../avatars/avatars.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), TypeOrmModule.forFeature([AvatarsEntity])],
  providers: [UsersService, AvatarsService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
