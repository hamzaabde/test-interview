import prisma from "../lib/prisma";

async function main() {
  for (let i = 1; i <= 3; i++) {
    await prisma.user.upsert({
      where: {
        id: i,
      },
      create: {
        id: i,
        email: `user${i}@domain`,
        name: `userName${i}`,
        lastName: `userSurname${i}`,
        age: 18,
        posts: {
          create: [
            {
              id: i,
              title: `postTitle${i}`,
              desc: `postDescription${i}`,
            },
          ],
        },
      },
      update: {},
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
