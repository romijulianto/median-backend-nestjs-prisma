import { PrismaClient } from '@prisma/client';

// initialize prisma client
const prisma = new PrismaClient();

async function main() {
    try {
        // create two dummy articles
        const post3 = await prisma.article.upsert({
            where: { title: 'Prisma Adds Support' },
            update: {},
            create: {
                title: 'Prisma Adds Support',
                body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
                description:
                    "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
                published: false,
            },
        });

        const post4 = await prisma.article.upsert({
            where: { title: "What's new in Prisma?" },
            update: {},
            create: {
                title: "What's new in Prisma?",
                body: 'Our engineers have been working hard, issuing new releases with many improvements...',
                description:
                    'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
                published: true,
            },
        });

        console.log({ post3, post4 });
    } catch (error) {
        console.log(error);
    }
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close prisma client at the end
        await prisma.$disconnect();
    });
