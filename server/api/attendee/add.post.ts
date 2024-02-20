import prisma from '../../../db/db';

export default defineEventHandler(async event => {
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
    where: { firstname: body.name, lastname: body.lastname },
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
      userId: body.userId,
      firstname: body.firstname,
      lastname: body.lastname,
      rating: Number(body.rating),
    },
  });

  return attendee;
});
