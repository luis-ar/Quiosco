import Router, { useRouter } from "next/router";
import React from "react";
import useQuiosco from "../hooks/useQuiosco";

const pasos = [
  { paso: 1, nombre: "Pedidos", url: "/admin" },
  { paso: 2, nombre: "Ordenes Completadas", url: "/ordenesCompletadas" },
];
const PasosAdmin = () => {
  let paso;
  const router = useRouter();
  if (router.pathname === "/admin") {
    paso = 1;
  } else if (router.pathname === "/ordenesCompletadas") {
    paso = 2;
  }
  return (
    <>
      <div className="flex justify-between my-5">
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
          className={`rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-${paso}/2`}
        ></div>
      </div>
    </>
  );
};

export default PasosAdmin;
