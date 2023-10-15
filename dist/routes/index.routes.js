"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
var express_1 = require("express");
var chat_routes_1 = require("./chat.routes");
var IndexRouter = (0, express_1.Router)();
exports.IndexRouter = IndexRouter;
IndexRouter.use(chat_routes_1.chatRouter);
