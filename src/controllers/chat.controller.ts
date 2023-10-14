import { Request, Response } from "express";
import httpStatus from "http-status";
import { chatService } from "../services/chat.services";

async function postMessage(req: Request, res: Response) {
  console.log(req.body)
  const response = await chatService.postMessage(req.body);
  res.status(httpStatus.OK).json(response);}

export const chatController = {
  postMessage,

};
