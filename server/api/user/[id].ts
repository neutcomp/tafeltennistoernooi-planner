import { PrismaClient } from "@prisma/client";
import { useRoute } from "vue-router";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const route = useRoute()

    const body = await readBody(event);

    console.log('body? ' + body)
    console.log(route.params.id)
    // Check if user exists
    const users = prisma.user.findFirst({
        where: { id: Number(route.params.id) }
    })

    return users;

    return [{
        "id": 1,
        "firstname": "bjorn",
        "lastname": "van der Neut"
    }]
})