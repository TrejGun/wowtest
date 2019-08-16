import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {UserRole} from "@package/types";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Array<UserRole>>("roles", context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    return request.user && roles.includes(request.user.role);
  }
}
