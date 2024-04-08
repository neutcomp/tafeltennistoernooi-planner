import { getTokenId } from '~/server/utils/helper';
import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  // Only allow POST requests
  assertMethod(event, ['POST']);

  const token = await getTokenId(event);
  const body = await readBody(event);

  const tournaments = prisma.tournament.findFirstOrThrow({
    where: { id: body.id, userId: String(token) },
    select: {
      id: true, name: true
    }
  });

  return tournaments;
});
