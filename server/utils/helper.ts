import Joi from 'joi';
import { H3Event } from 'h3';

export const UserSchema = Joi.object({
    firstname: Joi.string().max(20).min(2).required(),
    lastname: Joi.string().max(30).min(2).required(),
    email: Joi.string().max(50).min(6).required().email()
})

export const UserUpdateSchema = Joi.object({
    id: Joi.number().required(),
    firstname: Joi.string().max(20).min(2).required(),
    lastname: Joi.string().max(30).min(2).required(),
    email: Joi.string().max(50).min(6).required().email()
})

export const UserDeleteSchema = Joi.object({
    id: Joi.number().required()
})

export const LoginSchema = Joi.object({
    email: Joi.string().max(50).min(6).required().email()
})

export const AttendeeSchema = Joi.object({
    firstname: Joi.string().max(20).min(2).required(),
    lastname: Joi.string().max(30).min(2).required(),
})

export const cookieName = 'isAuthenticated'

export const checkAuthentication = (event: H3Event) => {
    console.log(event.context);

    return Boolean(event.context?.user);
} 
