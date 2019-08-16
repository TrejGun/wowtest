import * as PlainJoi from "@hapi/joi";

// tslint:disable-next-line:variable-name
const Joi = PlainJoi;

export const updateMessageSchema = Joi.object().keys({
  text: Joi.string().required(),
});
