import prisma from '../../../db/db';
import { getServerSession } from '#auth'

export default eventHandler(async event => {
  const session = await getServerSession(event);

  // If not authenticated do nothing
  if (!session) {
    return { statusMessage: 'unauthenticated' }
  }

  const token = await getTokenId(event);
  const body = await readBody(event);

  // Validate user
  const { error } = TournamentSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });

  // If we get an error, send it back
  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: error.message,
    });
  }

  // Check if tournament exists
  const userExist = await prisma.tournament.findFirst({
    where: { name: body.name, userId: String(token) },
  });

  if (userExist) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry dit toernooi bestaat al',
    });
  }

  // Create tournament
  const tournament = await prisma.tournament.create({
    data: {
      userId: String(token),
      name: body.name,
    },
  });

  return tournament;
});
