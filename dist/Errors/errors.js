"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
var http_status_1 = __importDefault(require("http-status"));
function ValidationError(errorArray) {
    var message = errorArray.message;
    var error = {
        httpCode: http_status_1.default.UNPROCESSABLE_ENTITY,
        message: message,
    };
    return error;
}
function NotFoundError() {
    var error = {
        httpCode: http_status_1.default.NOT_FOUND,
        message: "Not Found",
    };
    return error;
}
function UnauthorizedError() {
    var error = {
        httpCode: http_status_1.default.UNAUTHORIZED,
        message: "Unauthorized",
    };
    return error;
}
function ForbiddenError() {
    var error = {
        httpCode: http_status_1.default.FORBIDDEN,
        message: "Forbidden",
    };
    return error;
}
exports.Errors = {
    ValidationError: ValidationError,
    NotFoundError: NotFoundError,
    UnauthorizedError: UnauthorizedError,
    ForbiddenError: ForbiddenError,
};
