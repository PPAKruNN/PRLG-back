import { NextFunction, Request, Response } from "express";
import { Errors } from "../Errors/errors";
import { Schema } from "joi";

enum RequestOptions {
  body = "body",
  params = "params",
  query = "query",
}

function validateSchema(
  schema: Schema,
  type: RequestOptions = RequestOptions.body
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req[type]);

    if (result.error) {
      throw Errors.ValidationError(result.error);
    }

    next();
  };
}

export { validateSchema, RequestOptions };
