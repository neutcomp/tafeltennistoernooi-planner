import { getTokenId } from '~/server/utils/helper';
import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  // Only allow POST requests
  assertMethod(event, ['POST']);

  const token = await getTokenId(event);
  const body = await readBody(event);

  const attendee = prisma.attendee.findFirstOrThrow({
    where: {
      id: body.id,
      userId: { equals: String(token) }
    },
    select: {
      id: true, firstname: true, lastname: true, rating: true
    }
  });

  return attendee;
});
