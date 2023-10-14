import { NextFunction, Request, Response } from "express";
import { stripHtml } from "string-strip-html";

export function stringStripHtml(req: Request, res: Response, next: NextFunction) {
    Object.keys(req.body).forEach(key => {
        if (typeof(req.body[key]) === 'string') {
            req.body[key] = stripHtml(req.body[key]).result
            req.body[key] = req.body[key].trim()
        }
    })

    next()
}