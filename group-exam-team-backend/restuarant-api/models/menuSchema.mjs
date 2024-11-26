import Joi from 'joi';

export const menuSchema = Joi.object({
    name : Joi.string().required(),
    type : Joi.number().required(),
    price : Joi.string().required()
}); 