import { BaseValidator } from "./base";
import { SafeEnvError } from "../errors";

export class NumberValidator extends BaseValidator<number> {
  parse(value: string | undefined, key: string): number | undefined {
    if (value === undefined) {
      return this.resolveUndefined(key);
    }

    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      throw new SafeEnvError(key, `must be a valid finite number, received ${JSON.stringify(value)}`);
    }

    return parsed;
  }
}
