import { env } from "../utils/env";

export const googleConfig = {
  CLIENT_ID: env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URL: `${env.FRONTEND_URL}/auth/google/callback`,
  SCOPES: "https://www.googleapis.com/auth/calendar",
};
