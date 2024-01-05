import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useQuiosco from "../hooks/useQuiosco";

const BarraSuperior = () => {
  const [mostrarContenido, setMostrarContenido] = useState(false);
  const { setNombre, nombre, setCorreo, setPassword } = useQuiosco();
  const [email, setEmail] = useState("");
  const router = useRouter();
  const cerrarSesion = () => {
    setNombre("");
    setCorreo("");
    setPassword("");
    window.localStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    const predeterminado = window.localStorage.getItem("correo");
    const nombrePre = window.localStorage.getItem("nombre");
    setEmail(predeterminado ? predeterminado : "");
    setNombre(nombrePre ? nombrePre : "");
  }, [email]);
  return (
    <>
      <div className="w-full md:h-20 h-14 bg-amber-500 fixed flex items-center justify-end z-20">
        <div
          onMouseOver={() => setMostrarContenido(true)}
          onMouseOut={() => setMostrarContenido(false)}
          className=" h-full flex items-center"
        >
          <button className="flex justify-center items-center mr-4 bg-amber-800 p-3 md:p-4 rounded-full h-10 w-10 md:w-14 md:h-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 h-4 md:w-8 md:h-8"
            >
              <path
                fill="#fafafa"
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
          </button>
        </div>
      </div>
      {mostrarContenido && (
        <div
          onMouseOver={() => setMostrarContenido(true)}
          onMouseOut={() => setMostrarContenido(false)}
          className="bg-gray-100 md:mt-20 h-40 w-72 mt-14 fixed right-0 border z-20"
        >
          <div className="flex h-1/4 border-b-2 border-gray-300">
            <p className="w-1/2 font-bold  flex items-center justify-center">
              Fresh Coffee
            </p>
            <button
              onClick={cerrarSesion}
              className="hover:bg-slate-300 font-bold  w-1/2 h-full"
            >
              Cerrar Sesión
            </button>
          </div>
          <div className="flex h-3/4">
            <div className="w-1/3 flex items-center pl-2">
              <button className="hover:cursor-default bg-white rounded-full w-20 flex items-center justify-center h-20 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-12 h-12"
                >
                  <path
                    fill="#00000"
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
              </button>
            </div>
            <div className="w-2/3 flex flex-col justify-center pl-2">
              <p className="font-semibold">
                Usuario-<span className="font-bold">{nombre}</span>
              </p>
              <p className="font-bold">{email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BarraSuperior;
