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

  // Check if tournament exists
  const userExist = await prisma.tournament.findFirst({
    where: { id: body.tournamentId, userId: String(token) },
  });

  if (!userExist) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry dit toernooi bestaat niet',
    });
  }

  for (const attendeeId in body.attendees) {
    // Add attendee to tournament
    await prisma.tournamentAttendees.create({
      data: {
        tournamentId: body.tournamentId,
        attendeeId: Number(attendeeId),
      },
    });
  }
});
