import Joi from "joi"

const message = Joi.object({
    text: Joi.string().required(),
})

export const chatSchemas = {
    message
}