import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import AuthRoutes from "./Routes/AuthRoutes.js";
import cors from "cors";
import CategoryRoutes from "./Routes/CategoryRoutes.js";
import ProductRoutes from "./Routes/ProductRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = Express();

app.use(cors());
app.use(morgan("dev"));
app.use(Express.json());
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", ProductRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/Images/Product/",
  Express.static(path.join(__dirname, "Images/Product"))
);

app.get("/", (req, res) => {
  res.send({
    message: "hello world",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
