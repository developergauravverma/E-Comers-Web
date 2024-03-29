import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import AuthRoutes from "./Routes/AuthRoutes.js";
import cors from "cors";
import CategoryRoutes from "./Routes/CategoryRoutes.js";

dotenv.config();

const app = Express();

app.use(cors());
app.use(morgan("dev"));
app.use(Express.json());
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/category", CategoryRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "hello world",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
