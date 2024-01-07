import Image from "next/image";
import React, { useState } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { validarCorreo, validarPassword } from "../helpers";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const {
    setCorreo,
    correo,
    setPassword,
    password,
    mensaje,
    setMensaje,
    setNombre,
  } = useQuiosco();
  const router = useRouter();
  const limpiar = () => {
    setTimeout(() => {
      setMensaje("");
    }, 1500);
  };

  const inicioSesion = async (e) => {
    e.preventDefault();
    if ([correo, password].includes("")) {
      setMensaje("Todos los campos son Obligatorios");
      limpiar();
      return;
    }
    if (!validarCorreo(correo)) {
      setMensaje("Correo Invalido");
      limpiar();
      return;
    }
    if (!validarPassword(password)) {
      setMensaje("Contraseña minimo 6 caracteres");
      limpiar();
      return;
    }
    try {
      const respuesta = await axios.post("/api/inicio", {
        correo,
        password,
      });
      const { data } = respuesta;

      // localStorage.setItem("correo", correo);
      if (data.respuesta == 0 || data == 0) {
        setMensaje("Usuario no Encontrado");
        limpiar();
      } else if (data.respuesta == 1) {
        setMensaje("Contraseña Incorrecta");
        limpiar();
      } else if (data.respuesta == 2) {
        const { usuario } = data;
        const { nombre } = usuario;
        setNombre(nombre);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("correo", usuario.correo);
        router.push("/menu");
      } else {
        const { usuario } = data;
        const { nombre } = usuario;
        setNombre(nombre);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("correo", usuario.correo);
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center flex-col">
      <div>
        <aside className=" flex justify-center pt-10 pb-5">
          <Image
            width={400}
            height={150}
            src="/assets/img/logo.jpg"
            alt="imagen logotipo"
          />
        </aside>
      </div>
      <form onSubmit={inicioSesion} className=" w-3/4 max-w-sm">
        {mensaje !== "" && (
          <div className=" py-2 rounded bg-red-600">
            <h1 className=" text-sm md:text-xl text-white font-bold text-center uppercase">
              {mensaje}
            </h1>
          </div>
        )}

        <div className="my-5">
          <label
            htmlFor="email"
            className="block uppercase text-slate-800 font-bold"
          >
            Correo
          </label>
          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            id="email"
            type="email"
            className="bg-gray-200 w-full mt-3 p-2 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block uppercase text-slate-800 font-bold"
          >
            Contraseña
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            className="bg-gray-200 w-full  mt-3 p-2 rounded-md"
          />
        </div>
        <div className="mt-6">
          <input
            value={"Iniciar Sesión"}
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-5  uppercase font-bold rounded w-full"
          />
        </div>
        <div className="mt-3 flex justify-end">
          <div
            onClick={() => {
              router.push("/registro");
            }}
          >
            ¿No tienes cuenta?
            <span className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer">
              Registrate aqui
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
