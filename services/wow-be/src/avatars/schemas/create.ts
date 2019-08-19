import {IsString} from "../../validators";
import {CreateAvatarFields} from "../avatars.types";

export class CreateAvatarSchema implements CreateAvatarFields {
  @IsString({
    minLength: 1,
  })
  public description: string;
}
