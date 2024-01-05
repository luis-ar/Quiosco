import Router, { useRouter } from "next/router";
import React from "react";
import useQuiosco from "../hooks/useQuiosco";

const pasos = [
  { paso: 1, nombre: "Menú", url: "/menu" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", url: "/total" },
];
const Pasos = () => {
  let paso;
  const router = useRouter();
  if (router.pathname === "/menu") {
    paso = 1;
  } else if (router.pathname === "/resumen") {
    paso = 2;
  } else {
    paso = 3;
  }
  return (
    <>
      <div className="flex justify-between mb-5">
        {pasos.map((paso) => (
          <button
            className="text-sm md:text-2xl font-bold"
            key={paso.paso}
            onClick={() => {
              Router.push(`${paso.url}`);
            }}
          >
            {paso.nombre}
          </button>
        ))}
      </div>
      <div className="bg-gray-100 mb-10">
        <div
          className={`rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-${paso}/3`}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
