import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
    const query = getQuery(event);
    const queryResult = query.input;
    const items = await prisma.products.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: queryResult,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: queryResult,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    });

    return items
})