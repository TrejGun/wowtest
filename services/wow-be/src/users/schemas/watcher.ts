import * as PlainJoi from "@hapi/joi";
// @ts-ignore
import * as joiZxcvbn from "joi-zxcvbn";
import {UserRole} from "@package/types";

// tslint:disable-next-line:variable-name
const Joi = PlainJoi.extend(joiZxcvbn(PlainJoi));

export const createWatcherSchema = Joi.object().keys({
  email: Joi.string()
    .email({minDomainSegments: 2})
    .required(),
  password: Joi.string()
    .zxcvbn(1)
    .required(),
  firstName: Joi.string()
    .min(2)
    .regex(/^[a-z]+$/i, {name: "alpha"})
    .optional(),
  lastName: Joi.string()
    .min(2)
    .regex(/^[a-z]+$/i, {name: "alpha"})
    .optional(),
  role: Joi.valid([UserRole.Watcher]),
});
