import prisma from '../db/db';

async function main() {
  await prisma.user.create({
    data: {
      email: 'bjornvdneut@gmail.com',
      firstname: 'Bjorn',
      lastname: 'van der Neut',
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
