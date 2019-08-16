import * as PlainJoi from "@hapi/joi";

// tslint:disable-next-line:variable-name
const Joi = PlainJoi;

export const createAvatarSchema = Joi.object().keys({
  description: Joi.string()
    .alphanum()
    .min(10),
});
