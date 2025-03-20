import express from "express";
import { validate } from "express-validation";
import {
  getGoogleOAuthUrl,
  verifyCodeCallback,
} from "../controllers/auth-controller";

export const authRouter = express.Router();

authRouter.route("/google/oauth-url").get(getGoogleOAuthUrl);

authRouter.route("/google/callback").get(verifyCodeCallback);
