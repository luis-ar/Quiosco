import React from "react";
import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  const { nombre, icono, id } = categoria;
  const { categoriaActual, handleClickCategoria } = useQuiosco();
  return (
    <div
      className={`${
        categoriaActual?.id === id && "bg-amber-400"
      } flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:cursor-pointer`}
      onClick={() => handleClickCategoria(id)}
    >
      <img
        width={70}
        height={70}
        alt="Imagen Icono"
        src={`/assets/img/icono_${icono}.svg`}
      />
      <button type="button" className="text-2xl font-bold ">
        {nombre}
      </button>
    </div>
  );
};

export default Categoria;
