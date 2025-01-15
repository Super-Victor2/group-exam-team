import Joi from 'joi';

export const menuSchema = Joi.object({
    orderId: Joi.number().required(),
    items: Joi.array().items(Joi.object({
        id: Joi.number().required(),
        name: Joi.string().min(1).required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        type: Joi.string().valid('pizza', 'dricka', 'sallad').required(),
        price: Joi.string().pattern(/^\d+kr$/).required(),
        class: Joi.string().required(),
        quantity: Joi.number().required()
    })).required(),
    totalPrice: Joi.string().pattern(/^\d+kr$/).required(),
    status: Joi.string().required()
});