import Image from "next/image";
import React, { useState } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { encriptarPassword, validarCorreo, validarPassword } from "../helpers";
import axios from "axios";
import { useRouter } from "next/router";

const Registro = () => {
  const {
    setNombre,
    nombre,
    setCorreo,
    correo,
    setPassword,
    password,
    mensaje,
    setMensaje,
  } = useQuiosco();
  const router = useRouter();
  const limpiar = () => {
    setTimeout(() => {
      setMensaje("");
    }, 1500);
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    if ([nombre, correo, password].includes("")) {
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
    const passwordEncriptado = await encriptarPassword(password);
    try {
      const user = await axios.post("/api/registro", {
        nombre,
        passwordEncriptado,
        correo,
      });
      const { data } = user;
      router.push("/menu");
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("correo", correo);
      localStorage.setItem("codigo", data.id);
    } catch (error) {
      setMensaje("Usuario Existente");
      setTimeout(() => {
        setPassword("");
        setCorreo("");
        setNombre("");
      }, 1500);
      limpiar();
    }
  };
  return (
    <div className="flex items-center flex-col">
      <div>
        <aside className=" flex justify-center pt-10 pb-5">
          <img
            width={200}
            height={200}
            src="/assets/img/logo.jpg"
            alt="imagen logotipo"
            className="rounded-xl"
          />
        </aside>
      </div>
      <form onSubmit={registrarUsuario} className=" w-3/4 max-w-sm">
        {mensaje !== "" && (
          <div className=" py-2 rounded bg-red-600">
            <h1 className=" text-sm md:text-xl text-white font-bold text-center uppercase">
              {mensaje}
            </h1>
          </div>
        )}

        <div className="my-5 ">
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 font-bold"
          >
            Nombre
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            id="nombre"
            type="text"
            className="bg-gray-200 w-full  mt-3 p-2 rounded-md"
          />
        </div>
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
            value={"Registrarse"}
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-5  uppercase font-bold rounded w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default Registro;
