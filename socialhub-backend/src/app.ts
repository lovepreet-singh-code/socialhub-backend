import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SocialHub Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;
