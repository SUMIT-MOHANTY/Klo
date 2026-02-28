import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/errorHandler.middleware";

const app = express();

app.use(express.json());

// Mount auth routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
