import Image from "next/image";
import React from "react";
import { formatearDinero } from "/helpers/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";
import esLocale from "date-fns/locale/es";

const Orden = ({ orden, indice }) => {
  const { fecha, pedido, id, usuario, total } = orden;
  const { mensajes } = usuario;
  const router = useRouter();
  const lugar = router.pathname;
  const completarOrden = async () => {
    try {
      const codigo = usuario.id;
      const nuevoMensaje = {
        mensaje: "Su pedido se encuentra listo",
        fecha: Date.now().toString(),
      };
      const nuevo = [nuevoMensaje, ...mensajes];
      await axios.post(`/api/mensajes/${codigo}`, nuevo);
    } catch (error) {
      console.log(error);
    }
  };

  const prepararPedido = async (idPlatillo, estado) => {
    try {
      const { data } = await axios.post(
        `/api/pedido/${id}?estado=${estado}&idPlatillo=${idPlatillo}`
      );
      const todosPlatillosCompletados = data.pedido.every(
        (platillo) => platillo.estado === 2
      );
      if (todosPlatillosCompletados) {
        completarOrden();
      }
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error");
    }
  };

  return (
    <div className="border p-2 space-y-1" key={pedido.id}>
      <div>
        {pedido.map((platillo) => (
          <>
            <div
              key={platillo.id}
              className="py-1 flex flex-col md:flex-row border-b last-of-type:border-0 items-center "
            >
              <div className="px-1 space-y-1 text-center md:text-start flex gap-3 items-center w-full ">
                <div className="flex-1">
                  <h4 className="text-sm font-bold ">{platillo.nombre}</h4>
                  <p className="text-sm font-bold">
                    Cantidad: {platillo.cantidad}
                  </p>
                </div>
                <button
                  className={`${
                    platillo.estado === 0 ? "bg-green-600" : "bg-red-500"
                  } text-white font-bold p-2 rounded h-10`}
                  onClick={() => {
                    prepararPedido(platillo.id, platillo.estado + 1);
                  }}
                >
                  {platillo.estado === 0 ? "Preparar" : "Finalizar"}
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Orden;
