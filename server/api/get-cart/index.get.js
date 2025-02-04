import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
    const userId = getQuery(event).userId;

    try {
        const carts = await prisma.cart.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' }
        });

        return carts;
    } catch (error) {
        console.error('Error fetching carts:', error);
        throw new Error('Failed to fetch carts');
    } finally {
        await prisma.$disconnect();
    }
});




