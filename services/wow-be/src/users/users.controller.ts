import {Controller, Get, Param} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersEntity} from "./users.entity";

@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll(): Promise<Array<UsersEntity>> {
    return this.usersService.findAll();
  }

  @Get()
  public findOne(@Param("id") id: number): Promise<UsersEntity | undefined> {
    return this.usersService.findById(id);
  }
}
