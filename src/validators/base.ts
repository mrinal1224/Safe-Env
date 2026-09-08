export abstract class BaseValidator<T> {
  protected isOptional = false;
  protected hasDefault = false;
  protected defaultValue!: T;

  optional(): OptionalValidator<T, this> {
    this.isOptional = true;
    return this as OptionalValidator<T, this>;
  }

  default(value: T): DefaultValidator<T, this> {
    this.defaultValue = value;
    this.hasDefault = true;
    return this as DefaultValidator<T, this>;
  }

  protected resolveUndefined(key: string): T | undefined {
    if (this.hasDefault) {
      return this.defaultValue;
    }

    if (this.isOptional) {
      return undefined;
    }

    throw new Error(`[safe-env] Missing required environment variable: ${key}`);
  }

  abstract parse(value: string | undefined, key: string): T | undefined;
}

export type OptionalValidator<T, V extends BaseValidator<T>> = V & {
  readonly __optional?: true;
};

export type DefaultValidator<T, V extends BaseValidator<T>> = V & {
  readonly __default?: T;
};
