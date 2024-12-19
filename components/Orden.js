import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Orden = ({ orden, indice }) => {
  const { pedido, id, mensajes, ordenId } = orden;
  mensajes = JSON.parse(mensajes);
  const completarOrden = async () => {
    try {
      const nuevoMensaje = {
        mensaje: "Su pedido se encuentra listo",
        fecha: Date.now().toString(),
      };
      const nuevo = [nuevoMensaje, ...mensajes];

      await axios.post(`/api/mensajes/${id}`, nuevo);
    } catch (error) {
      console.log(error);
    }
  };

  const prepararPedido = async (idPlatillo, estado) => {
    try {
      console.log("probandood");
      const { data } = await axios.post(
        `/api/pedido/${ordenId}?estado=${estado}&idPlatillo=${idPlatillo}`
      );

      if (data) {
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
                  <h4 className="text-lg font-bold ">
                    {platillo.nombre} <span>{platillo.cantidad}</span>
                  </h4>
                </div>
                <button
                  className={`${
                    platillo.estado === 0 ? "bg-green-600" : "bg-red-500"
                  } text-white font-bold p-2 rounded h-10 text-xs`}
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
