import { createEnv, z } from "../src";

const env = createEnv(
  {
    PORT: z.number(),
    DEBUG: z.boolean().optional(),
    NODE_ENV: z.enum(["development", "production"] as const),
  },
  {
    PORT: "3000",
    NODE_ENV: "development",
  },
);

const port: number = env.PORT;
const debug: boolean | undefined = env.DEBUG;
const nodeEnv: "development" | "production" = env.NODE_ENV;

// @ts-expect-error PORT is a number, not a string.
const invalid: string = env.PORT;

void port;
void debug;
void nodeEnv;
void invalid;
