import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
// import {UsersService} from "./users/users.service";
import {UsersController} from "./users/users.controller";
import * as ormconfig from "./ormconfig";

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
