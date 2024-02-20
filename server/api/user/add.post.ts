import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  // Validate user
  const { error } = UserSchema.validate(body, {
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
  const userExist = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (userExist) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry deze gebruiker bestaat al',
    });
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
    },
  });

  return user;
});
