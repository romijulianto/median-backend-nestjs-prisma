import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// TODO: initialize prisma client
const prisma = new PrismaClient();

const roundsOfString = 10;

async function main() {
  const passwordRomi1 = await bcrypt.hash('romijulianto1', roundsOfString);
  const passwordRomi2 = await bcrypt.hash('romijulianto2', roundsOfString);
  try {
    const user1 = await prisma.user.upsert({
      where: { email: 'romijulianto@admin.com' },
      update: { password: passwordRomi1 },
      create: {
        email: 'romijulianto@admin.com',
        name: 'Romi Julianto',
        password: passwordRomi1,
      },
    });

    const user2 = await prisma.user.upsert({
      where: { email: 'romyjulians@admin.com' },
      update: { password: passwordRomi2 },
      create: {
        email: 'romyjulians@admin.com',
        name: 'Romi Julianto',
        password: passwordRomi2,
      },
    });

    // TODO: create three dummy articles
    const post1 = await prisma.article.upsert({
      where: { title: 'Prisma Adds Support for MongoDB' },
      update: {
        authorId: user1.id,
      },
      create: {
        title: 'Prisma Adds Support for MongoDB',
        body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
        description:
          "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
        published: false,
        authorId: user1.id,
      },
    });

    const post2 = await prisma.article.upsert({
      where: { title: "What's new in Prisma? (Q1/22)" },
      update: {
        authorId: user2.id,
      },
      create: {
        title: "What's new in Prisma? (Q1/22)",
        body: 'Our engineers have been working hard, issuing new releases with many improvements...',
        description:
          'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
        published: true,
        authorId: user2.id,
      },
    });

    const post3 = await prisma.article.upsert({
      where: { title: 'Prisma Client Just Became a Lot More Flexible' },
      update: {},
      create: {
        title: 'Prisma Client Just Became a Lot More Flexible',
        body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
        description:
          'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
        published: true,
      },
    });

    console.log({ user1, user2, post1, post2, post3 });
  } catch (error) {
    console.log(error);
  }
}

// TODO: execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // TODO: close prisma client at the end
    await prisma.$disconnect();
  });
