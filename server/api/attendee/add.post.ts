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
      firstname: { equals: body.firstname },
      lastname: { equals: body.lastname },
      userId: { equals: String(token) }
    },
    select: {
      id: true,
    },
  });

  if (attendeeExist) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry deze deelnemer bestaat al',
    });
  }

  // Create attendee
  const attendee = await prisma.attendee.create({
    data: {
      userId: String(token),
      firstname: body.firstname,
      lastname: body.lastname,
      rating: Number(body.rating),
    },
  });

  return attendee;
});
