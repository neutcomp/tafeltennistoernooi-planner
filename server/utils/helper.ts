import Joi from 'joi';

export const UserDeleteSchema = Joi.object({
    id: Joi.string().required()
})

export const AttendeeSchema = Joi.object({
    firstname: Joi.string().max(20).min(2).required(),
    lastname: Joi.string().max(30).min(2).required(),
    rating: Joi.number().min(0).max(3000)
})

export const AttendeeDeleteSchema = Joi.object({
    id: Joi.number().required()
})

export const TournamentSchema = Joi.object({
    name: Joi.string().max(40).min(2).required(),
});

export const TournamentDeleteSchema = Joi.object({
    id: Joi.number().required()
})
