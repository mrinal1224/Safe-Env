export abstract class BaseValidator<T> {
  protected isOptional = false;
  protected hasDefault = false;
  protected defaultValue!: T;

  optional(): this {
    this.isOptional = true;
    return this;
  }

  default(value: T): this {
    this.defaultValue = value;
    this.hasDefault = true;
    return this;
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
