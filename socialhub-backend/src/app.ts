import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SocialHub Backend Running 🚀");
});

app.use(errorHandler);

export default app;
