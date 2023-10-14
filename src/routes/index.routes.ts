import { Router } from "express";
import { chatRouter } from "./chat.routes";

const IndexRouter = Router();

IndexRouter.use(chatRouter);

export { IndexRouter };
