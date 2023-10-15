"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
// Pro error handler funcionar, você precisa que os parametros
// atendam ao ErrorRequestHandler
function ErrorHandler(err, _req, res, _next) {
    var error = err;
    console.log(error);
    if (!error.httpCode)
        return res.status(500).send(error);
    res.status(error.httpCode).send(error.message);
}
exports.ErrorHandler = ErrorHandler;
