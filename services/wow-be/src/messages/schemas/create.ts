import * as PlainJoi from "@hapi/joi";

// tslint:disable-next-line:variable-name
const Joi = PlainJoi;

export const createMessageSchema = Joi.object().keys({
  text: Joi.string().required(),
});
