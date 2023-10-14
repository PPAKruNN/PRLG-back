import { NextFunction, Request, Response } from "express";
import { ApiError } from "../protocols/protocols";

// Pro error handler funcionar, você precisa que os parametros
// atendam ao ErrorRequestHandler
function ErrorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): any {
  const error = err as ApiError;
  console.log(error);

  if (!error.httpCode) return res.status(500).send(error);

  res.status(error.httpCode).send(error.message);
}

export { ErrorHandler };
