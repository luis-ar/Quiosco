import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useQuiosco from "../hooks/useQuiosco";
import useSWR from "swr";
import axios from "axios";
import Notificacion from "./Notificacion";
import { toast } from "react-toastify";

const BarraSuperior = () => {
  const [mostrarContenido, setMostrarContenido] = useState(false);
  const [mensaje, setMensajes] = useState([]);
  const [notificacion, setNotificacion] = useState(false);
  const { setNombre, nombre, setCorreo, setPassword, setCodigo, codigo } =
    useQuiosco();
  const [email, setEmail] = useState("");
  const router = useRouter();
  const fetcher = () => {
    if (codigo !== undefined) {
      return axios.get(`/api/user/${codigo}`).then((datos) => datos.data);
    }
    return Promise.reject("Codigo is undefined");
  };

  const { data, error, isLoading } = useSWR(`/api/user/${codigo}`, fetcher, {
    refreshInterval: 100,
  });

  useEffect(() => {
    if (data !== undefined) {
      setMensajes(data[0].mensajes);
    }
  }, [data]);

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
    const codigoPre = window.localStorage.getItem("codigo");
    setEmail(predeterminado ? predeterminado : "");
    setNombre(nombrePre ? nombrePre : "");
    setCodigo(codigoPre ? codigoPre : "");
  }, [email]);
  const borrarNotificaciones = async () => {
    const nuevo = [];
    console.log(codigo);
    const { data } = await axios.post(`/api/mensajes/${codigo}`, nuevo);
    toast.success("Mensajes eliminados con éxito");
  };
  return (
    <>
      <div className="w-full md:h-20 h-14 bg-amber-500 fixed flex items-center justify-end z-20">
        <div
          onMouseOver={() => {
            setMostrarContenido(true);
          }}
          onMouseOut={() => {
            setMostrarContenido(false);
          }}
          className="h-full flex items-center relative"
        >
          {router.pathname !== "/admin" &&
            router.pathname !== "/ordenesCompletadas" && (
              <span className="absolute flex items-center justify-center top-1 right-1 w-6 h-6 md:w-8 md:h-8 text-xm bg-white font-bold rounded-full p-1">
                {mensaje.length}
              </span>
            )}

          <button className="flex justify-center items-center mr-6 bg-amber-800 p-3 md:p-4 rounded-full h-10 w-10 md:w-14 md:h-14">
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
          onMouseOver={() => {
            setMostrarContenido(true);
            setNotificacion(false);
          }}
          // onMouseOut={() => setMostrarContenido(false)}
          className={`${
            router.pathname !== "/admin" &&
            router.pathname !== "/ordenesCompletadas" &&
            "h-48"
          } bg-gray-100 md:mt-20 h-40 w-72 mt-14 fixed right-0 border z-20`}
        >
          <div className="flex h-1/4 border-b-2 border-gray-300">
            <p className="w-1/2 font-bold  flex items-center justify-center">
              Chifa Marino
            </p>
            <button
              onClick={cerrarSesion}
              className="hover:bg-slate-300 font-bold  w-1/2 h-full"
            >
              Cerrar Sesión
            </button>
          </div>
          {!notificacion ? (
            <div
              className={`${
                router.pathname !== "/admin" &&
                router.pathname !== "/ordenesCompletadas" &&
                "h-2/4"
              } flex h-3/4`}
            >
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
          ) : mensaje.length > 0 ? (
            <div className="h-2/4 p-2 overflow-y-auto">
              {mensaje.map((men, i) => (
                <Notificacion men={men} key={i} />
              ))}
            </div>
          ) : (
            <div className="h-2/4 flex items-center justify-center">
              <p className="font-bold">Aún no tiene Notificaciones</p>
            </div>
          )}
          {router.pathname !== "/admin" &&
            router.pathname !== "/ordenesCompletadas" && (
              <>
                {!notificacion ? (
                  <div
                    onClick={() => setNotificacion(true)}
                    className="h-1/4 cursor-pointer hover:bg-gray-400 bg-gray-300 flex items-center justify-center"
                  >
                    <span className="font-bold">Ver Mis Notificaciones</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-6 h-6 ml-3"
                    >
                      <path
                        fill="#0d0d0d"
                        d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    onClick={borrarNotificaciones}
                    className="h-1/4 cursor-pointer hover:bg-red-600 bg-red-500 flex items-center justify-center"
                  >
                    <span className="font-bold">Borrar Mis Notificaciones</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-6 h-6 ml-3"
                    >
                      <path
                        fill="#000000"
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                      />
                    </svg>
                  </div>
                )}
              </>
            )}
        </div>
      )}
    </>
  );
};

export default BarraSuperior;
