import {Controller, Get, Request, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth/auth.service";

@Controller("api")
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  public async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  public getProfile(@Request() req: any) {
    return req.user;
  }
}
