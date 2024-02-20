import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  // Validate user
  const { error } = UserUpdateSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });

  // If we get an error, send it back
  if (error) {
    throw createError({
      message: error.message,
    });
  }

  // Check if user exists
  const userExist = await prisma.user.findFirst({
    where: { id: body.id },
  });

  if (!userExist) {
    throw createError({
      message: 'Sorry deze gebruiker bestaat niet',
    });
  }

  // Check if email exists
  const userEmailExist = await prisma.user.findFirst({
    where: {
      email: body.email,
      NOT: { id: body.id },
    },
  });

  if (userEmailExist) {
    throw createError({
      message: 'Sorry dit emailadres bestaat al',
    });
  }

  // Update user
  const user = await prisma.user.update({
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      updatedAt: new Date(),
    },
    where: {
      id: body.id,
    },
  });

  return user;
});
