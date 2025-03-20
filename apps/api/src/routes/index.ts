import express from "express";
import { authRouter } from "./auth.route";

export const routes = express.Router();

routes.get("/status", (req, res) => res.send("OK"));

// For quick tests
routes.post("/test", (req, res) => {
  res.respond({ data: { test: "test" }, statusCode: 200 });
});

// auth routes
routes.use("/auth", authRouter);
