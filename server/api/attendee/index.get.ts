import prisma from '../../../db/db';

export default defineEventHandler(async event => {
  const attendees = prisma.attendee.findMany();

  return attendees;
});
