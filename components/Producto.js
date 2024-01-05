import React from "react";
import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
const Producto = ({ producto }) => {
  const { nombre, imagen, precio } = producto;
  const { handleSetProducto, handleChangeModal } = useQuiosco();
  return (
    <div className="border p-3 flex flex-col">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${nombre}`}
        width={400}
        height={400}
      />
      <div className="p-5 flex-1">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
      </div>
      <button
        type="button"
        className="bg-indigo-600 hover:bg-indigo-400 text-white w-full p-3 uppercase font-bold mt-auto"
        onClick={() => {
          handleSetProducto(producto);
          handleChangeModal();
        }}
      >
        Agregar
      </button>
    </div>
  );
};

export default Producto;
