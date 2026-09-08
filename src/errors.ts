export class SafeEnvError extends Error {
  public readonly key: string;

  constructor(key: string, message: string) {
    super(`[safe-env] ${key}: ${message}`);
    this.name = "SafeEnvError";
    this.key = key;
  }
}
