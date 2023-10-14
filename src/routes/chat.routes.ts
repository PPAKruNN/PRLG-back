import { stringStripHtml } from "../middlewares/stringStripHtml.middleware";
import {
    RequestOptions,
    validateSchema,
} from "../middlewares/validateSchema.middleware";
import { Router } from "express";
import { chatSchemas } from "../schemas/chat.schema";
import { chatController } from "../controllers/chat.controller";

const chatRouter = Router();

chatRouter.post("/chat/:categoryId",
    stringStripHtml,
    validateSchema(chatSchemas.message, RequestOptions.body),
    chatController.postMessage
);

export { chatRouter };
