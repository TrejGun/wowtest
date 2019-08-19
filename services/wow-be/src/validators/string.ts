import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

interface StringConstraints {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  regexp?: RegExp;
  type?: any;
}

@ValidatorConstraint()
class ValidateString implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: any, args: ValidationArguments) {
    this.reason = ValidateString.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage() {
    return this.reason;
  }

  private static isValid(value: any, args: ValidationArguments): string {
    const {required, minLength, maxLength, regexp, type}: StringConstraints = args.constraints[0];

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

    if (typeof minLength !== "undefined" && value.length < minLength) {
      return "tooShort";
    }

    if (typeof maxLength !== "undefined" && value.length > maxLength) {
      return "tooLong";
    }

    if (regexp && !regexp.test(value)) {
      return "patternMismatch";
    }

    if (type && !Object.values(type).includes(value)) {
      return "badInput";
    }

    return "";
  }
}

export function IsString(constraints: StringConstraints = {}, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isString",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateString,
    });
  };
}
