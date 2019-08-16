import {SetMetadata} from "@nestjs/common";

export function Roles(...roles: Array<string>) {
  return SetMetadata("roles", roles);
}
