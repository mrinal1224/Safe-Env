export type EnvSchema = Record<string, unknown>;

export function createEnv<T extends EnvSchema>(schema: T): T {
  return schema;
}

export const z = {
  string: () => ({ kind: "string" as const }),
  number: () => ({ kind: "number" as const }),
  boolean: () => ({ kind: "boolean" as const }),
};
