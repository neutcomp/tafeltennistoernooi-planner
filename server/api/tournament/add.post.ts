import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  // Validate user
  const { error } = TournamentSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });

  // If we get an error, send it back
  if (error) {
    throw createError({
      message: error.message,
    });
  }

  // Check if tournament exists
  const userExist = await prisma.tournament.findFirst({
    where: { name: body.name },
  });

  if (userExist) {
    throw createError({
      message: 'Sorry dit toernooi bestaat al',
    });
  }

  // Create tournament
  const tournament = await prisma.tournament.create({
    data: {
      userId: 1, // Todo make this depending on the user that has login
      name: body.firstname,
    },
  });

  return tournament;
});
