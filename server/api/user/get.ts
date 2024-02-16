import { PrismaClient } from "@prisma/client";


export default defineEventHandler(async () => {
    const prisma = new PrismaClient();

    // Check if user exists
    const users = prisma.user.findMany({
        where: { isActive: true }
    })

    return users;
})