import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const { codigo } = req.query;
    const mensajes = req.body;
    try {
      await prisma.$queryRaw`
        UPDATE Usuario
        SET mensajes = ${JSON.stringify(mensajes)}
        WHERE id = ${parseInt(codigo)}
      `;

      res.status(200).json({ message: "Mensaje actualizado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el mensaje" });
    } finally {
      await prisma.$disconnect();
    }
  }
}
