import { PrismaClient } from "@prisma/client";


export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const body = await readBody(event);

    // Validate user
    const { error } = UserDelete.validate(body, {
        abortEarly: true,
        allowUnknown: true
    });

    // If we get an error, send it back
    if (error) {
        throw createError({
            message: error.message
        });
    }

    // Check if user exists
    const userExist = prisma.user.findFirst({
        where: { email: body.email }
    })

    if (userExist != null) {
        throw createError({
            message: 'Sorry deze gebruiker bestaat niet'
        });
    }

    // Create user
    const user = await prisma.user.delete({
        where: {
            id: body.id
        }
    })

    return user;
})