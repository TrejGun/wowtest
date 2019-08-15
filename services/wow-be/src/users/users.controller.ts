import {Controller, Get, Param} from "@nestjs/common";
// import {UseGuards} from "@nestjs/common";
// import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "./users.service";
import {UsersEntity} from "./users.entity";

// @UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/")
  public findAll(): Promise<Array<UsersEntity>> {
    return this.usersService.findAll();
  }

  @Get("/:id")
  public findOne(@Param("id") id: number): Promise<UsersEntity | undefined> {
    return this.usersService.findById(id);
  }
}
