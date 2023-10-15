import { Request, Response } from "express";
import httpStatus from "http-status";
import { chatService } from "../services/chat.services";

async function postMessage(req: Request, res: Response) {
  const response = await chatService.postMessage(req.body);

  res.status(httpStatus.OK).json(response);
}

async function postCostumerQuestion(req: Request, res: Response) {
  const response = await chatService.postCostumerQuestion(req.body.question);

  res.status(httpStatus.OK).json(response);
}

export const chatController = {
  postMessage,
  postCostumerQuestion,
  
};
