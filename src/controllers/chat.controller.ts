import { Request, Response } from "express";
import httpStatus from "http-status";
import { chatService } from "../services/chat.services";

async function postMessage(req: Request, res: Response) {
  const response = await chatService.postMessage(req.body.text);

  res.status(httpStatus.OK).send(response);
}

export const chatController = {
  postMessage,

};
