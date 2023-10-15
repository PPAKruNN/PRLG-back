import { stringStripHtml } from "../middlewares/stringStripHtml.middleware";
import {
    RequestOptions,
    validateSchema,
} from "../middlewares/validateSchema.middleware";
import { Router } from "express";
import { chatSchemas } from "../schemas/chat.schema";
import { chatController } from "../controllers/chat.controller";

const chatRouter = Router();

//TODO route de sugestões de respostas
chatRouter.post("/chat", //:categoryId
    stringStripHtml,
    // validateSchema(chatSchemas.message, RequestOptions.body),
    chatController.postMessage
);

chatRouter.post("/costumer-question", //:productId
    stringStripHtml,
    chatController.postCostumerQuestion
);

export { chatRouter };
