import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
    const products = await readBody(event);

    try {
        const updatePromises = products.map(product => {
            return prisma.products.update({
                where: { id: product.id },
                data: { stock: product.stock }
            });
        });

        await Promise.all(updatePromises);
        return { message: 'Stock updated successfully' };
    } catch (error) {
        console.error('Error updating stock:', error);
        throw new Error('Failed to update stock');
    } finally {
        await prisma.$disconnect();
    }
});


