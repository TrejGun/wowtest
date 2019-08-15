import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  public async validateUser(username: string, password: string): Promise<any> {
    return this.usersService.getByCredentials(username, password);
  }

  public async login(user: any) {
    const payload = {username: user.email, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
