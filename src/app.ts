import Express, { json } from "express";
import "express-async-errors";
import Dotenv from "dotenv";
import cors from "cors";
import { IndexRouter } from "./routes/index.routes";
import { ErrorHandler } from "./middlewares/ErrorHandler.middleware";

Dotenv.config();
const app = Express();

app.use(cors());
app.use(json());
app.use(IndexRouter);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server initialized on port: ", PORT);
});
