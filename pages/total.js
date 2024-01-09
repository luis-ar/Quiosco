import { useCallback, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

export default function Total() {
  const { pedido, setNombre, nombre, colocarOrden, total } = useQuiosco();

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length < 3;
  }, [pedido, nombre]);
  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido, nombre]);

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>
      <form onSubmit={colocarOrden}>
        <div>
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 font-bold"
          >
            Nombre
          </label>
          <input
            readOnly
            id="nombre"
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <p className="text-2xl">
            Total a pagar: {""}
            <span className="font-bold">{formatearDinero(total)}</span>
          </p>
        </div>
        <div className="mt-6">
          <input
            type="submit"
            className={`${
              comprobarPedido()
                ? "bg-indigo-300"
                : " bg-indigo-600 hover:bg-indigo-800 cursor-pointer"
            } text-center w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`}
            value="Confirmar pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
