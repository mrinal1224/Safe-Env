export type ValidatorOutput<T> = T;

export abstract class BaseValidator<T, TOutput = T> {
  protected isOptional = false;
  protected hasDefault = false;
  protected defaultValue!: T;

  optional(): BaseValidator<T, T | undefined> {
    this.isOptional = true;
    return this as unknown as BaseValidator<T, T | undefined>;
  }

  default(value: T): BaseValidator<T, T> {
    this.defaultValue = value;
    this.hasDefault = true;
    this.isOptional = false;
    return this as unknown as BaseValidator<T, T>;
  }

  protected resolveUndefined(key: string): TOutput {
    if (this.hasDefault) {
      return this.defaultValue as TOutput;
    }

    if (this.isOptional) {
      return undefined as TOutput;
    }

    throw new Error(`[safe-env] Missing required environment variable: ${key}`);
  }

  abstract parse(value: string | undefined, key: string): TOutput;
}
