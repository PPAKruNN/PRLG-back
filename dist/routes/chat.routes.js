"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
var stringStripHtml_middleware_1 = require("../middlewares/stringStripHtml.middleware");
var express_1 = require("express");
var chat_controller_1 = require("../controllers/chat.controller");
var chatRouter = (0, express_1.Router)();
exports.chatRouter = chatRouter;
chatRouter.post("/chat", //:categoryId
stringStripHtml_middleware_1.stringStripHtml, 
// validateSchema(chatSchemas.message, RequestOptions.body),
chat_controller_1.chatController.postMessage).get("/chat", chat_controller_1.chatController.getDescription);
chatRouter.post("/customer-question", //:productId
stringStripHtml_middleware_1.stringStripHtml, chat_controller_1.chatController.postCustomerQuestion);
chatRouter.get("/announcement", chat_controller_1.chatController.getDescription);
