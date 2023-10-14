import httpStatus, { HttpStatus } from "http-status";
import { ValidationError as ValidationErrorType } from "joi";
import { ApiError } from "../protocols/protocols";

function ValidationError(errorArray: ValidationErrorType) {
  const message = errorArray.message;

  const error: ApiError = {
    httpCode: httpStatus.UNPROCESSABLE_ENTITY,
    message: message,
  };

  return error;
}

function NotFoundError() {
  const error: ApiError = {
    httpCode: httpStatus.NOT_FOUND,
    message: "Not Found",
  };

  return error;
}

function UnauthorizedError() {
  const error: ApiError = {
    httpCode: httpStatus.UNAUTHORIZED,
    message: "Unauthorized",
  };

  return error;
}

function ForbiddenError() {
  const error: ApiError = {
    httpCode: httpStatus.FORBIDDEN,
    message: "Forbidden",
  };

  return error;
}

export const Errors = {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
};
