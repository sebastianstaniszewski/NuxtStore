import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const { userId } = query;

    let userProducts;

    try {
        userProducts = await prisma.products.findMany({
            where: {
                userId,
            },
        });
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return userProducts;
});
