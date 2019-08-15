import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AvatarsService} from "./avatars.service";
import {AvatarsEntity} from "./avatars.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AvatarsEntity])],
  providers: [AvatarsService],
  exports: [AvatarsService],
})
export class AvatarsModule {}
