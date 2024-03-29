import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  console.log(event.context);

  const body = await readBody(event);

  // Validate
  const { error } = LoginSchema.validate(body, { abortEarly: true, allowUnknown: true });

  // Is we get an error, send it back
  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: error.message,
    });
  }

  const user = prisma.user.findFirst({
    where: { email: body.email },
  });

  // Is user does not exist
  if (!user) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry de gebruiker kan niet gevonden worden',
    });
  }

  // create cookie for authentication
  setCookie(event, cookieName, user.email);

  const cookie = getCookie(event, cookieName);
  console.log('Cookie net na save: ' + cookie);

  return user;
});
