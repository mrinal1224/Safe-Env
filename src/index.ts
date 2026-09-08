import { createEnv } from "./createEnv";
import { BooleanValidator } from "./validators/boolean";
import { EnumValidator } from "./validators/enum";
import { NumberValidator } from "./validators/number";
import { StringValidator } from "./validators/string";

export { createEnv } from "./createEnv";
export { SafeEnvError } from "./errors";
export type { InferEnv, InferValidator } from "./types";

export const z = {
  string: () => new StringValidator(),
  number: () => new NumberValidator(),
  boolean: () => new BooleanValidator(),
  enum: <const T extends readonly string[]>(values: T) => new EnumValidator(values),
};

export type EnvSchema = Parameters<typeof createEnv>[0];
