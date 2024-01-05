import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  //obtener ordenes
  if (req.method === "GET") {
    const ordenes = await prisma.orden.findMany({
      where: {
        estado: false,
      },
    });
    res.status(200).json(ordenes);
  }

  //Crear Ordenes
  if (req.method === "POST") {
    console.log(req.body);
    const orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        total: req.body.total,
        pedido: req.body.pedido,
        fecha: req.body.fecha,
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
