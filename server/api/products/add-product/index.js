import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const { title, description, thumbnail, category, price, stock, userId } = query;

    let newProduct;

    try {
        newProduct = await prisma.products.create({
            data: {
                title,
                description,
                thumbnail,
                category,
                stock: parseInt(stock),
                price: parseInt(price),
                userId
            }
        });
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }

    return newProduct;
});
