import { PrismaClient } from '@prisma/client';
import { $fetch } from 'ofetch';

const dummyJsonAPI = 'https://dummyjson.com/products';
const prisma = new PrismaClient();

const pushProducts = async () => {
    const response = await $fetch(dummyJsonAPI);
    const products = response.products;

    try {
        for (const product of products) {
            await prisma.products.create({
                data: {
                    title: product.title,
                    description: product.description,
                    image: product.images || [],
                    thumbnail: product.thumbnail,
                    price: product.price,
                    stock: product.stock || 0,
                    category: product.category,
                    userId: ''
                },
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

pushProducts();
