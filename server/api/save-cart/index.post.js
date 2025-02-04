import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const { userId, cart } = body;

    try {
        const savedCart = await prisma.cart.create({
            data: {
                userId,
                items: cart,
                sessionId: 'some-unique-session-id',
            }
        });

        return savedCart;
    } catch (error) {
        console.error('Error saving cart:', error);
        throw new Error('Failed to save cart');
    } finally {
        await prisma.$disconnect();
    }
});




