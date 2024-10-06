import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const { id, idPlatillo, estado } = req.query;

    try {
      // 1. Buscar la orden usando el ID
      const orden = await prisma.orden.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          usuario: true, // Asegúrate de tener los datos del usuario relacionados
        },
      });
      if (!orden) {
        return res.status(404).json({ error: "Orden no encontrada" });
      }

      // 2. Buscar el platillo dentro del campo "pedido" (array de objetos)
      const pedidoActualizado = orden.pedido.map((platillo) => {
        if (platillo.id === parseInt(idPlatillo)) {
          // 3. Actualizar el campo "estado" del platillo
          return { ...platillo, estado: parseInt(estado) };
        }
        return platillo;
      });

      // 4. Verificar si todos los platillos tienen estado 2
      const todosPlatillosCompletados = pedidoActualizado.every(
        (platillo) => platillo.estado === 2
      );

      // 5. Actualizar el estado de la orden si todos los platillos tienen estado 2
      const ordenActualizada = await prisma.orden.update({
        where: {
          id: parseInt(id),
        },
        data: {
          pedido: pedidoActualizado,
          estado: todosPlatillosCompletados ? true : orden.estado,
        },
      });

      // 6. Si todos los platillos están completados, envía el mensaje al usuario

      res.status(200).json(ordenActualizada);
    } catch (error) {
      console.error("Error actualizando la orden: ", error);
      res.status(500).json({ error: "Error actualizando la orden" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
