import httpStatus, { HttpStatus } from "http-status";
import { ValidationError as ValidationErrorType } from "joi";
import { ApiError } from "protocols";

function ValidationError(errorArray: ValidationErrorType) {
  const message = errorArray.message;

  const error: ApiError = {
    httpCode: httpStatus.UNPROCESSABLE_ENTITY,
    message: message,
  };

  return error;
}
