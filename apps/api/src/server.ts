import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/error-handler";
import { responseHandler } from "./middlewares/response-handler";
import { routes } from "./routes";
import { env } from "./utils/env";

const app: Express = express();

// Connect to db
connectDB();

// Enable CORS
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

// parsers
app.use(express.json());

// Logging middleware
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("short"));
}

// Custom response handler middleware
app.use(responseHandler);

// Mount routers
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("InternBit API");
});

app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server is running in ${env.NODE_ENV} at http://localhost:${PORT}`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);

  // Close server and exit process
  server.close(() => process.exit(1));
});
