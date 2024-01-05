import Image from "next/image";
import React from "react";
import { formatearDinero } from "/helpers/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";
import esLocale from "date-fns/locale/es";

const Orden = ({ orden }) => {
  const { fecha, pedido, id, nombre, total } = orden;
  const router = useRouter();
  const lugar = router.pathname;
  const completarOrden = async () => {
    try {
      const { data } = await axios.post(`/api/ordenes/${id}`);
      toast.success("Pedido Completado");
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error");
    }
  };
  const formatearTiempoPublicacion = (timestamp) => {
    const fecha = new Date(timestamp);
    return formatDistanceToNow(fecha, { addSuffix: false, locale: esLocale });
  };
  return (
    <div className="border p-10 space-y-5">
      <h3 className="text-2xl font-bold">Orden: {id}</h3>
      <p className="text-lg font-bold">Cliente: {nombre}</p>
      <p className="text-sm font-bold">
        Pedido hace: {formatearTiempoPublicacion(parseInt(fecha))}
      </p>
      <div>
        {pedido.map((platillo) => (
          <div
            key={platillo.id}
            className="py-1 flex flex-col md:flex-row border-b last-of-type:border-0 items-center "
          >
            <div className="w-32">
              <Image
                width={400}
                height={500}
                src={`/assets/img/${platillo.imagen}.jpg`}
                alt={`Imagen Platillo ${platillo.nombre}`}
              />
            </div>
            <div className="p-5 space-y-2 text-center md:text-start">
              <h4 className="text-xl font-bold text-amber-500">
                {platillo.nombre}
              </h4>
              <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="md:flex md:items-center md:justify-between my-10">
        <p className=" font-black md:text-3xl text-amber-500">
          Total a pagar :{" "}
          <span className="md:text-4xl">{formatearDinero(total)}</span>
        </p>

        {lugar !== "/ordenesCompletadas" && (
          <button
            onClick={completarOrden}
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-5  uppercase font-bold rounded"
          >
            Completar Orden
          </button>
        )}
      </div>
    </div>
  );
};

export default Orden;
