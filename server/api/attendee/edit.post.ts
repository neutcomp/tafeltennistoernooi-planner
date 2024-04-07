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

  // Validate attendee
  const { error } = AttendeeSchema.validate(body, {
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

  // Check if attendee exists
  const attendeeExist = await prisma.attendee.findFirst({
    where: {
      id: { equals: body.id },
      userId: { equals: String(token) }
    },
    select: {
      id: true,
    },
  });

  if (!attendeeExist) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry deze deelnemer bestaat niet',
    });
  }

  // Update attendee
  const attendee = await prisma.attendee.update({
    where: {
      id: body.id,
    },
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      rating: Number(body.rating),
      updatedAt: dayjs().format()
    },
  });

  return attendee;
});
