import type { BaseValidator } from "./validators/base";

export type AnyValidator = BaseValidator<unknown>;

export type InferValidator<T> = T extends BaseValidator<infer Output>
  ? T extends { readonly __optional?: true }
    ? Output | undefined
    : T extends { readonly __default?: unknown }
      ? Output
      : Output
  : never;

export type InferEnv<T extends Record<string, AnyValidator>> = {
  [K in keyof T]: InferValidator<T[K]>;
};
