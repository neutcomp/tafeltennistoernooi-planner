import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const body = await readBody(event);

    // Validate user
    const { error } = TournamentDeleteSchema.validate(body, {
        abortEarly: true,
        allowUnknown: true
    });

    // If we get an error, send it back
    if (error) {
        throw createError({
            message: error.message
        });
    }

    // Check if tournament exists
    const tournamentExist = prisma.tournament.findFirst({
        where: { id: body.id }
    })

    if (tournamentExist === null) {
        throw createError({
            message: 'Sorry deze gebruiker bestaat niet'
        });
    }

    // // Delete tournament
    const tournament = await prisma.tournament.delete({
        where: {
            id: body.id
        }
    })

    return tournament;
})