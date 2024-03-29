import { getTokenId } from '~/server/utils/helper';
import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  const token = await getTokenId(event);

  const attendees = prisma.attendee.findMany({
    where: { userId: token }
  });

  return attendees;
});
