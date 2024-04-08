import Joi from 'joi';
import { H3Event } from 'h3';
import { getServerSession } from '#auth'
import prisma from '../../db/db';

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

export const getTokenId = async (event: H3Event) => {
    const session = await getServerSession(event);

    // If not authenticated do nothing
    if (session) {
        // Get the JWT token from the DB
        const token = await prisma.user.findFirst({
            where: {
                email: { equals: session?.user?.email },
            },
            select: {
                id: true,
            },
        });

        return token?.id
    } else {
        return ''
    }
}
