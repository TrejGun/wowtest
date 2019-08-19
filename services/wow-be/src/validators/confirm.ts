import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

interface ConfirmConstraints {
  required?: boolean;
  relatedPropertyName?: string;
}

@ValidatorConstraint()
class ValidateConfirm implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: any, args: ValidationArguments) {
    this.reason = ValidateConfirm.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage() {
    return this.reason;
  }

  private static isValid(value: any, args: ValidationArguments): string {
    const {required = true, relatedPropertyName = "password"}: ConfirmConstraints = args.constraints[0];

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

    if (required && value === "") {
      return "valueMissing";
    }

    const relatedValue = (args.object as any)[relatedPropertyName];

    if (relatedValue !== value) {
      return "badInput";
    }

    return "";
  }
}

export function IsConfirm(constraints: ConfirmConstraints = {}, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isConfirm",
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidateConfirm,
    });
  };
}
