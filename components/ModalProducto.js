import React, { useEffect, useState } from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

const ModalProducto = () => {
  const { producto, handleChangeModal, handleAgregarPedido, pedido } =
    useQuiosco();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);
  useEffect(() => {
    //comprobar si el modal esta pedido
    if (pedido.some((produc) => produc.id === producto.id)) {
      setEdicion(true);
      const productoEdicion = pedido.filter((ped) => ped.id === producto.id);
      setCantidad(productoEdicion[0].cantidad);
    }
  }, [producto, pedido]);

  return (
    <div className="md:flex gap-16 mt-20 md:mt-0">
      <div
        className="flex justify-end absolute right-3 "
        onClick={handleChangeModal}
      >
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="md:w-1/3 flex justify-center">
        <img
          alt={`imagen producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
          className="w-64"
        />
      </div>
      <div className="md:w-2/3 flex items-center flex-col md:block">
        <h1 className="text-3xl font-bold mt-5 text-center md:text-start">
          {producto.nombre}
        </h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatearDinero(producto.precio)}
        </p>
        <div className="flex gap-4 mt-5">
          <button
            type="button"
            onClick={() => {
              if (cantidad > 1) {
                setCantidad(cantidad - 1);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>
          <button
            type="button"
            onClick={() => {
              if (cantidad < 10) {
                setCantidad(cantidad + 1);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
          onClick={() => {
            handleAgregarPedido({ ...producto, cantidad });
            handleChangeModal();
          }}
        >
          {!edicion ? "Añadir al Pedido" : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
