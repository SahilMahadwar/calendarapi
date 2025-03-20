import { google } from "googleapis";
import { googleConfig } from "../config/google";

const oauth2Client = new google.auth.OAuth2({
  clientId: googleConfig.CLIENT_ID,
  clientSecret: googleConfig.CLIENT_SECRET,
  redirectUri: googleConfig.REDIRECT_URL,
});

export const generateGoogleOAuthUrl = async () => {
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    prompt: "consent",
    scope: googleConfig.SCOPES,
  });

  console.log(googleConfig.REDIRECT_URL);

  return url;
};

export const verifyGoogleOAuthCode = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);

  return tokens;
};
