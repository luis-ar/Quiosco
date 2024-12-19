import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const COMPLETED_STATE = 2;

export default async function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ error: "Método no permitido" });
  // }
  const { id, idPlatillo, estado } = req.query;
  const orderId = parseInt(id);
  const platilloId = parseInt(idPlatillo);
  const newEstado = parseInt(estado);

  try {
    const orden = await prisma.$queryRaw`
  SELECT id, estado, pedido
  FROM Orden
  WHERE id = ${orderId}
`;
    const pedido = JSON.parse(orden[0].pedido);

    const pedidoActualizado = pedido.map((platillo) => {
      if (platillo.id === platilloId) {
        platillo.estado = newEstado;
      }
      return platillo;
    });

    const allCompleted = pedidoActualizado.every(
      (platillo) => platillo.estado === COMPLETED_STATE
    );
    await prisma.$queryRaw`
      UPDATE Orden
      SET estado = ${allCompleted},
          pedido = ${JSON.stringify(pedidoActualizado)}
      WHERE id = ${orderId}
    `;
    // const ordenActualizada = await prisma.$queryRaw`
    //   SELECT pedido
    //   FROM Orden
    //   WHERE id = ${orderId}
    // `;
    return res.status(200).json(allCompleted);
  } catch (error) {
    console.error("Error actualizando la orden:", error);
    return res
      .status(error.code === "P2025" ? 404 : 500)
      .json({ error: error.message });
  }
}
