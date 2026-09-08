import { beforeEach, describe, expect, it } from "vitest";
import { createEnv, SafeEnvError, z } from "../src";

describe("createEnv", () => {
  beforeEach(() => {
    delete process.env.PORT;
    delete process.env.DEBUG;
    delete process.env.NODE_ENV;
    delete process.env.JWT_SECRET;
  });

  it("parses strings, numbers and booleans", () => {
    process.env.PORT = "3000";
    process.env.DEBUG = "true";
    process.env.NODE_ENV = "production";

    const env = createEnv({
      PORT: z.number(),
      DEBUG: z.boolean(),
      NODE_ENV: z.enum(["development", "production"] as const),
    });

    expect(env.PORT).toBe(3000);
    expect(env.DEBUG).toBe(true);
    expect(env.NODE_ENV).toBe("production");
  });

  it("uses defaults for missing values", () => {
    const env = createEnv({
      PORT: z.number().default(3000),
    });

    expect(env.PORT).toBe(3000);
  });

  it("returns undefined for optional values", () => {
    const env = createEnv({
      DEBUG: z.boolean().optional(),
    });

    expect(env.DEBUG).toBeUndefined();
  });

  it("rejects invalid numbers", () => {
    process.env.PORT = "abc";

    expect(() =>
      createEnv({
        PORT: z.number(),
      }),
    ).toThrow(SafeEnvError);
  });

  it("rejects invalid booleans", () => {
    process.env.DEBUG = "yes";

    expect(() =>
      createEnv({
        DEBUG: z.boolean(),
      }),
    ).toThrow(SafeEnvError);
  });

  it("rejects invalid enum values", () => {
    process.env.NODE_ENV = "staging";

    expect(() =>
      createEnv({
        NODE_ENV: z.enum(["development", "production"] as const),
      }),
    ).toThrow(SafeEnvError);
  });

  it("collects multiple configuration errors", () => {
    process.env.PORT = "nope";
    process.env.DEBUG = "maybe";

    expect(() =>
      createEnv({
        PORT: z.number(),
        DEBUG: z.boolean(),
        JWT_SECRET: z.string(),
      }),
    ).toThrow(/PORT|DEBUG|JWT_SECRET/);
  });
});
