import dotenv from "dotenv";
import { z } from "zod";

// load env vars
dotenv.config();

const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.string().min(1),

  MONGODB_URL: z.string().min(1),

  FRONTEND_URL: z.string().min(1),

  GOOGLE_CLIENT_ID: z.string().min(1),

  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  MONGODB_URL: process.env.MONGODB_URL,

  FRONTEND_URL: process.env.FRONTEND_URL,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

type ServerInput = z.input<typeof server>;
type ServerOutput = z.infer<typeof server>;
type ServerSafeParseReturn = z.SafeParseReturnType<ServerInput, ServerOutput>;

let env = process.env as ServerOutput;

const parsed = server.safeParse(processEnv) as ServerSafeParseReturn;

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

env = parsed.data as ServerOutput;

export { env };
