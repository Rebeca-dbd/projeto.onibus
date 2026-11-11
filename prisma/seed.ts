import bcrypt from "bcrypt";
import { prisma } from "../src/prisma";

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: { name: "Teste", email: "teste@email.com", passwordHash },
  });

  console.log(user);
}

main().finally(() => prisma.$disconnect());