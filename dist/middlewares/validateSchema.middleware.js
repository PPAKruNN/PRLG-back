"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestOptions = exports.validateSchema = void 0;
var errors_1 = require("../Errors/errors");
var RequestOptions;
(function (RequestOptions) {
    RequestOptions["body"] = "body";
    RequestOptions["params"] = "params";
    RequestOptions["query"] = "query";
})(RequestOptions || (exports.RequestOptions = RequestOptions = {}));
function validateSchema(schema, type) {
    if (type === void 0) { type = RequestOptions.body; }
    return function (req, res, next) {
        var result = schema.validate(req[type]);
        if (result.error) {
            throw errors_1.Errors.ValidationError(result.error);
        }
        next();
    };
}
exports.validateSchema = validateSchema;
