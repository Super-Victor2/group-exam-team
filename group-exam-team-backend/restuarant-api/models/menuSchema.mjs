import Joi from 'joi';

export const menuSchema = Joi.object({
    name: Joi.string().min(3).required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    type: Joi.string().valid('Pizza', 'Dricka', 'Sallad').required(),
    price: Joi.string().pattern(/^\d+kr$/).required(),
});