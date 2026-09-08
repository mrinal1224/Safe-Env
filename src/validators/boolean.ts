import { BaseValidator } from "./base";
import { SafeEnvError } from "../errors";

export class BooleanValidator extends BaseValidator<boolean> {
  parse(value: string | undefined, key: string): boolean | undefined {
    if (value === undefined) {
      return this.resolveUndefined(key);
    }

    if (value === "true") return true;
    if (value === "false") return false;

    throw new SafeEnvError(
      key,
      `must be "true" or "false", received ${JSON.stringify(value)}`,
    );
  }
}
