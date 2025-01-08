import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    role: Joi.string().min(3).valid('admin', 'user').required()
});