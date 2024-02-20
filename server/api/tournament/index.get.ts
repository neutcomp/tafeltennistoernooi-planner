import prisma from '../../../db/db';

export default defineEventHandler(async () => {
  const tournaments = prisma.tournament.findMany();

  return tournaments;
});
