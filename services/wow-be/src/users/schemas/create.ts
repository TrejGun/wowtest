import * as PlainJoi from "@hapi/joi";
// @ts-ignore
import * as joiDate from "@hapi/joi-date";
// @ts-ignore
import * as joiZxcvbn from "joi-zxcvbn";
import {UserGender, UserRole} from "@package/types";

// tslint:disable-next-line:variable-name
const Joi = PlainJoi.extend(joiZxcvbn(PlainJoi)).extend(joiDate);

export const createUserSchema = Joi.object().keys({
  email: Joi.string()
    .email({minDomainSegments: 2})
    .required(),
  password: Joi.string()
    .zxcvbn(1)
    .required(),
  firstName: Joi.string()
    .min(2)
    .regex(/^[a-z]+$/i, {name: "alpha"})
    .required(),
  lastName: Joi.string()
    .min(2)
    .regex(/^[a-z]+$/i, {name: "alpha"})
    .required(),
  role: Joi.valid([UserRole.Influencer, UserRole.Marketer]),
  birthday: Joi.date()
    .format("YYYY-MM-DD")
    .when("role", {is: UserRole.Influencer, then: Joi.required()}),
  gender: Joi.valid(Object.values(UserGender)).when("role", {
    is: UserRole.Influencer,
    then: Joi.optional(),
    otherwise: Joi.forbidden(),
  }),
  description: Joi.string()
    .min(100)
    .when("role", {is: UserRole.Marketer, then: Joi.optional(), otherwise: Joi.forbidden()}),
  phone: Joi.string()
    .min(2)
    .regex(/^[0-9]+$/i, {name: "numeric"})
    .when("role", {is: UserRole.Marketer, then: Joi.optional(), otherwise: Joi.forbidden()}),
});
