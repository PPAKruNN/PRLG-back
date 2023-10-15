import { Request, Response } from "express";
import httpStatus from "http-status";
import { chatService } from "../services/chat.services";
import { allResponses } from "../database/db";

let counter = 0;

async function postMessage(req: Request, res: Response) {
  req.body.counter = counter;
  const response = await chatService.postMessage(req.body);
  console.info(req.body.questions)
  res.status(httpStatus.OK).json(response);
}

async function postCustomerQuestion(req: Request, res: Response) {
  const response = await chatService.postCustomerQuestion(req.body.question);

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
  postCustomerQuestion,
  
};
