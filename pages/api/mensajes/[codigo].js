import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  //actualizar el estado
  if (req.method === "POST") {
    const { codigo } = req.query;
    console.log(req.body);
    const mensajeActualizado = await prisma.usuario.update({
      where: {
        id: parseInt(codigo),
      },
      data: {
        mensajes: req.body,
      },
    });
    res.status(200).json(mensajeActualizado);
  }
}
