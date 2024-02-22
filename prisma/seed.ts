import prisma from '../db/db';

async function main() {
  await prisma.user.create({
    data: {
      firstname: 'Bjorn',
      lastname: 'van der Neut',
      email: 'bjornvdneut@gmail.com',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
