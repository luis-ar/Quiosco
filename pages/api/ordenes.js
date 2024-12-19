import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  //obtener ordenes
  if (req.method === "GET") {
    const ordenes =
      await prisma.$queryRaw`SELECT o.*, o.id AS ordenId, u.*, u.id AS usuarioId FROM Orden o LEFT JOIN Usuario u ON o.usuarioId = u.id WHERE o.estado = false`;
    res.status(200).json(ordenes);
  }

  //Crear Ordenes
  if (req.method === "POST") {
    console.log(req.body);
    const orden = await prisma.orden.create({
      data: {
        total: req.body.total,
        pedido: req.body.pedido,
        fecha: req.body.fecha,
        usuarioId: parseInt(req.body.codigo),
      },
    });

    res.json(orden);
  }
  if (req.method === "DELETE") {
    try {
      const resultado = await prisma.orden.deleteMany({
        where: {
          estado: true,
        },
      });
      res.json(resultado);
    } catch (error) {
      console.error("Error al borrar elementos:", error);
    }
  }
}
