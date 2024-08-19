import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      gender: 'Female',
      sleepRecords: {
        create: [
          { date: new Date('2023-08-01'), duration: { hours: 7, minutes: 30 } },
          { date: new Date('2023-08-02'), duration: { hours: 8, minutes: 0 } },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      gender: 'Male',
      sleepRecords: {
        create: [
          { date: new Date('2023-08-01'), duration: { hours: 6, minutes: 45 } },
          { date: new Date('2023-08-02'), duration: { hours: 7, minutes: 15 } },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
