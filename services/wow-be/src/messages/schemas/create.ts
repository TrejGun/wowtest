import {IsString} from "../../validators";
import {UpdateMessageFields} from "../messages.types";

export class CreateMessageSchema implements UpdateMessageFields {
  @IsString({
    minLength: 1,
  })
  public text: string;
}
