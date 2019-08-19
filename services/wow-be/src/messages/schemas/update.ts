import {IsString} from "../../validators";
import {UpdateMessageFields} from "../messages.types";

export class UpdateMessageSchema implements UpdateMessageFields {
  @IsString({
    minLength: 1,
  })
  public text: string;
}
