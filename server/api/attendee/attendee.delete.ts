import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  // Validate attendee
  const { error } = AttendeeDeleteSchema.validate(body, {
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
  const attendeeExist = prisma.attendee.findFirst({
    where: { id: body.id },
  });

  if (attendeeExist === null) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry dit toernooi bestaat niet',
    });
  }

  // // Delete attendee
  const attendee = await prisma.attendee.delete({
    where: {
      id: body.id,
    },
  });

  return attendee;
});
