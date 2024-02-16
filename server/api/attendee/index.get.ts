import { PrismaClient } from "@prisma/client";


export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();

    const attendees = prisma.attendee.findMany();

    return attendees;
})