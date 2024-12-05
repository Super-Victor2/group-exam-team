import Joi from 'joi';

export const menuSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    type: Joi.string().valid('pizza', 'dricka', 'sallad').required(),
    price: Joi.string().pattern(/^\d+kr$/).required(),
    class: Joi.string().required(),
    quantity: Joi.number().required()
});