import {ValidateIf} from "class-validator";
import {UserGender, UserRole} from "@package/types";
import {IsString, IsConfirm, IsPassword} from "../../validators";
import {CreateUserFields} from "../users.types";
import {reEmail} from "../../constants";

export class CreateUserSchema implements CreateUserFields {
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
    required: true,
    regexp: /[A-Z][a-z]+/,
    minLength: 2,
  })
  public firstName: string;

  @IsString({
    required: true,
    regexp: /[A-Z][a-z]+/,
    minLength: 2,
  })
  public lastName: string;

  @IsString({
    required: true,
    type: {
      [UserRole.Marketer]: UserRole.Marketer,
      [UserRole.Influencer]: UserRole.Influencer,
    },
  })
  public role: UserRole;

  @ValidateIf(o => o.role === UserRole.Influencer)
  @IsString({
    required: true,
    regexp: /([12][0-9]{3})-(0[1-9]|1[0-2])-([12][0-9]|0[1-9]|3[01])/,
  })
  public birthday: string;

  @ValidateIf(o => o.role === UserRole.Influencer)
  @IsString({
    type: UserGender,
  })
  public gender: UserGender;

  @ValidateIf(o => o.role === UserRole.Marketer)
  @IsString({
    regexp: /^[0-9]+$/i,
    minLength: 2,
  })
  public phone: string;

  @ValidateIf(o => o.role === UserRole.Marketer)
  @IsString({
    minLength: 100,
  })
  public description: string;
}
