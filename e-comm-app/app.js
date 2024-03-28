import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./Routes/AuthRoutes.js";
import cors from "cors";

dotenv.config();

const app = Express();

app.use(cors());
app.use(morgan("dev"));
app.use(Express.json());
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "hello world",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
