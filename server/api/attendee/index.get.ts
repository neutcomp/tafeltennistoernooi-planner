import { getTokenId } from '~/server/utils/helper';
import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  // Only allow GET requests
  assertMethod(event, ['GET']);

  const token = await getTokenId(event);
  //const { searchOn } = event.context.params;

  const attendees = prisma.attendee.findMany({
    where: { userId: token },
    orderBy: [{
      firstname: 'asc'
    },
    {
      lastname: 'asc'
    }]
  });

  return attendees;
});
