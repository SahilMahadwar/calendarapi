import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/error-response";

const asyncHandler =
  <
    T extends (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<unknown>,
  >(
    fn: T
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.log(err);
      return next(
        new ErrorResponse({ message: message, statusCode: statusCode })
      );
    });
  };

export { asyncHandler };
