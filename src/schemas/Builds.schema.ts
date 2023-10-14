import Joi from "joi"

const locator = Joi.object({
    id: Joi.number().positive().integer().allow(0).required(),
})

export const BuildsSchemas = {
    locator
}