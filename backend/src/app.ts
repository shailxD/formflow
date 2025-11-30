import express from "express";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

import { getRoutes } from "./utils/listRoutes";

app.get("/", (req, res) => {
  const routes = getRoutes(app);
  res.json({
    message: "FormFlow Backend API is running",
    endpoints: routes,
  });
});

app.use("/api", router);

app.use(errorHandler);
