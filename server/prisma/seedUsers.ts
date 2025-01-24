import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: 'john@example.com',
      password: '1234567',
      username: 'john',
      name: 'John'
    },
    {
      email: 'maria@example.com',
      password: '7654321',
      username: 'maria',
      name: 'Maria'
    },
  ];

  for (const user of users) {
    await prisma.users.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
