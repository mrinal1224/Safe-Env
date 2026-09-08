import { SafeEnvError } from "./errors";
import type { AnyValidator, InferEnv } from "./types";

export function createEnv<T extends Record<string, AnyValidator>>(
  schema: T,
  source: NodeJS.ProcessEnv = process.env,
): InferEnv<T> {
  const result: Record<string, unknown> = {};
  const errors: SafeEnvError[] = [];

  for (const [key, validator] of Object.entries(schema)) {
    try {
      result[key] = validator.parse(source[key], key);
    } catch (error) {
      if (error instanceof SafeEnvError) {
        errors.push(error);
        continue;
      }

      if (error instanceof Error) {
        throw error;
      }

      throw new Error(String(error));
    }
  }

  if (errors.length > 0) {
    const message = errors.map((error) => `  • ${error.message}`).join("\n");
    throw new SafeEnvError("environment", `Invalid environment configuration:\n${message}`);
  }

  return result as InferEnv<T>;
}
