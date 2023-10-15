import { Request, Response } from "express";
import httpStatus from "http-status";
import { chatService } from "../services/chat.services";
import { allResponses } from "../database/db";

async function postMessage(req: Request, res: Response) {
  const response = await chatService.postMessage(req.body);
  res.status(httpStatus.OK).json(response);
}

async function getDescription(req: Request, res: Response) {
  const description = await chatService.getResponseDescription();
  const response = await chatService.getForm(description);
  // console.info({... description, ...response})
  res.status(httpStatus.OK).json({... description, ...response});
}


export const chatController = {
  postMessage,
  getDescription,
};
