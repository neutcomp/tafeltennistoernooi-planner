import prisma from '../../../db/db';
import { getServerSession } from '#auth'
import dayjs from 'dayjs';

export default eventHandler(async event => {
  // Only allow POST requests
  assertMethod(event, ['POST']);

  const session = await getServerSession(event);

  // If not authenticated do nothing
  if (!session) {
    return { statusMessage: 'unauthenticated' }
  }

  const token = await getTokenId(event);
  const body = await readBody(event);

  // Validate tournament
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
  const tournamentExist = await prisma.tournament.findFirst({
    where: {
      id: { equals: body.id },
      userId: { equals: String(token) }
    },
    select: {
      id: true,
    },
  });

  if (!tournamentExist) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry dit toernooi bestaat niet',
    });
  }

  // Update tournament
  const tournament = await prisma.tournament.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      updatedAt: dayjs().format()
    },
  });

  return tournament;
});
