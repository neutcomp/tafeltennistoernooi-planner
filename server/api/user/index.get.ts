import prisma from '../../../db/db';

export default defineEventHandler(async () => {
  // Check if user exists
  const users = prisma.user.findMany();
  console.log(users);

  return users;
});
