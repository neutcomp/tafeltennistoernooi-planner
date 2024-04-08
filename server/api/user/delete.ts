import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  // Validate user
  const { error } = UserDeleteSchema.validate(body, {
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

  // Check if user exists
  const userExist = prisma.user.findFirst({
    where: { id: body.id },
  });

  if (userExist === null) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry deze gebruiker bestaat niet',
    });
  }

  // // Delete user
  const user = await prisma.user.delete({
    where: {
      id: body.id,
    },
  });

  return user;
});
