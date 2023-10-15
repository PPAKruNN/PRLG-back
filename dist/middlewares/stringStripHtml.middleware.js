"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringStripHtml = void 0;
var string_strip_html_1 = require("string-strip-html");
function stringStripHtml(req, res, next) {
    Object.keys(req.body).forEach(function (key) {
        if (typeof (req.body[key]) === 'string') {
            req.body[key] = (0, string_strip_html_1.stripHtml)(req.body[key]).result;
            req.body[key] = req.body[key].trim();
        }
    });
    next();
}
exports.stringStripHtml = stringStripHtml;
