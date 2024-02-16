import { PrismaClient } from '@prisma/client';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const prisma = new PrismaClient();
    const userAuth = checkAuthentication(event);

    if (!userAuth) {
        throw createError({
            message: 'Unauthorized',
            statusCode: 401
        })
    }

    const user = prisma.user.findFirst({
        where: {
            email: event.context?.user?.email
        }
    })

    // Is user does not exist
    if (!user) {
        throw createError({
            message: 'Sorry de gebruiker kan niet gevonden worden'
        });
    }

    // create cookie for authentication
    setCookie(event, cookieName, user.email, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true
    });

    return user;
})