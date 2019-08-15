import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  public async validateUser(email: string, password: string): Promise<any> {
    return this.usersService.getByCredentials(email, password);
  }

  public async login(user: any) {
    const payload = {email: user.email, id: user.id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
