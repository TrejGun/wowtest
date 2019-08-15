import * as Joi from "@hapi/joi";
import {PipeTransform, Injectable, BadRequestException} from "@nestjs/common";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Object) {}

  public transform(value: any) {
    const {error} = Joi.validate(value, this.schema);
    if (error) {
      throw new BadRequestException("Validation failed");
    }
    return value;
  }
}
