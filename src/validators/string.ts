import { BaseValidator } from "./base";
import { SafeEnvError } from "../errors";

export class StringValidator extends BaseValidator<string> {
  private minLength?: number;
  private maxLength?: number;

  min(length: number): this {
    this.minLength = length;
    return this;
  }

  max(length: number): this {
    this.maxLength = length;
    return this;
  }

  parse(value: string | undefined, key: string): string | undefined {
    if (value === undefined) {
      return this.resolveUndefined(key);
    }

    if (this.minLength !== undefined && value.length < this.minLength) {
      throw new SafeEnvError(
        key,
        `must be at least ${this.minLength} characters long`,
      );
    }

    if (this.maxLength !== undefined && value.length > this.maxLength) {
      throw new SafeEnvError(
        key,
        `must be at most ${this.maxLength} characters long`,
      );
    }

    return value;
  }
}
