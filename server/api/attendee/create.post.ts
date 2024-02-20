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
      message: error.message,
    });
  }
  console.log(body.firstname + ' ' + body.lastname);
  // Check if attendee exists
  const attendeeExist = prisma.user.findFirst({
    where: { firstname: body.firstname, lastname: body.lastname },
  });

  if (attendeeExist.attendee.length > 0) {
    throw createError({
      message: 'Sorry deze speler bestaat al',
    });
  }

  // Create attendee
  const attendee = await prisma.attendee.create(body);
  return attendee;
});
