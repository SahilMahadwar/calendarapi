import { asyncHandler } from "../middlewares/async-handler";
import {
  generateGoogleOAuthUrl,
  verifyGoogleOAuthCode,
} from "../services/auth.service";
import { ErrorResponse } from "../utils/error-response";

export const getGoogleOAuthUrl = asyncHandler(async (req, res, next) => {
  const OAuthUrl = await generateGoogleOAuthUrl();

  return res.respond({ data: { OAuthUrl }, statusCode: 200 });
});

export const verifyCodeCallback = asyncHandler(async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    return next(
      new ErrorResponse({
        message: "Code is required",
        statusCode: 400,
      })
    );
  }

  const tokens = await verifyGoogleOAuthCode(code as string);

  return res.respond({ data: { ...tokens }, statusCode: 200 });
});
