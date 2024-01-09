import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  //obtener ordenes completas
  const ordenes = await prisma.orden.findMany({
    where: {
      estado: true,
    },

    include: {
      usuario: true,
    },
  });
  res.status(200).json(ordenes);
}
