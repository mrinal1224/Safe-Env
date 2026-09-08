import { BaseValidator } from "./base";
import { SafeEnvError } from "../errors";

export class EnumValidator<T extends readonly string[]> extends BaseValidator<T[number]> {
  constructor(private readonly values: T) {
    super();
  }

  parse(value: string | undefined, key: string): T[number] | undefined {
    if (value === undefined) {
      return this.resolveUndefined(key);
    }

    if (this.values.includes(value)) {
      return value as T[number];
    }

    throw new SafeEnvError(
      key,
      `must be one of ${this.values.map((item) => JSON.stringify(item)).join(", ")}, received ${JSON.stringify(value)}`,
    );
  }
}
