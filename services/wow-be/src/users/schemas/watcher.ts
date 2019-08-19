import {UserRole} from "@package/types";
import {IsString, IsConfirm, IsPassword} from "../../validators";
import {CreateWatcherFields} from "../users.types";
import {reEmail} from "../../constants";

export class CreateWatcherSchema implements CreateWatcherFields {
  @IsString({
    required: true,
    regexp: reEmail,
  })
  public email: string;

  @IsPassword()
  public password: string;

  @IsConfirm()
  public confirm: string;

  @IsString({
    regexp: /[A-Z][a-z]+/,
    minLength: 2,
  })
  public firstName: string;

  @IsString({
    regexp: /[A-Z][a-z]+/,
    minLength: 2,
  })
  public lastName: string;

  @IsString({
    required: true,
    type: {
      [UserRole.Watcher]: UserRole.Watcher,
    },
  })
  public role: UserRole;
}
