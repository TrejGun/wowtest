import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import * as zxcvbn from "zxcvbn";

interface PasswordConstraints {
  required?: boolean;
  score?: number;
}

@ValidatorConstraint()
class ValidatePassword implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: any, args: ValidationArguments) {
    this.reason = ValidatePassword.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage() {
    return this.reason;
  }

  private static isValid(value: any, args: ValidationArguments): string {
    const {required = true, score = 1}: PasswordConstraints = args.constraints[0];

    if (typeof value === "undefined" || value === "") {
      if (required) {
        return "valueMissing";
      } else {
        return "";
      }
    }

    if (typeof value !== "string") {
      return "typeMismatch";
    }

    if (zxcvbn(value).score < score) {
      return "badInput";
    }

    return "";
  }
}

export function IsPassword(constraints: PasswordConstraints = {}, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isPassword",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidatePassword,
    });
  };
}
