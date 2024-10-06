import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import Orden from "../components/Orden";
import axios from "axios";
import useSWR from "swr";
import { formatearDinero } from "/helpers/index";
import { toast } from "react-toastify";
import ResumenVentas from "../components/ResumenVentas";
const OrdenesCompletadas = () => {
  const [montoRecaudado, setMontoRecaudado] = useState(0);
  const fetcher = () =>
    axios.get("/api/ordenesCompletas").then((datos) => datos.data);
  const { data, error, isLoading } = useSWR("/api/ordenesCompletas", fetcher, {
    refreshInterval: 100,
  });
  useEffect(() => {
    if (data?.length > 0) {
      const nuevoTotal = data.reduce(
        (montoRecaudado, pedi) => pedi.total + montoRecaudado,
        0
      );
      setMontoRecaudado(nuevoTotal);
    }
  }, [data]);
  const finalizarDia = async () => {
    try {
      const { data } = await axios.delete(`/api/ordenes`);
      toast.success("Finalizado el dia con exito");
      setMontoRecaudado(0);
    } catch (error) {
      toast.error("Hubo un error");
    }
  };
  return (
    <AdminLayout pagina={"Ordenes Finalizadas"}>
      <h1 className="text-4xl font-black text-center">Ordenes Finalizadas</h1>
      <p className="font-bold text-sm my-5 md:text-xl">
        Monto Recaudado en el dia:{" "}
        <span className="text-2xl">{formatearDinero(montoRecaudado)}</span>
      </p>

      {data && data.length > 0 && (
        <button
          onClick={finalizarDia}
          type="button"
          className="bg-red-600 hover:bg-red-800 text-white mb-5 md:mt-0 py-3 px-10 uppercase font-bold rounded"
        >
          Finalizar Dia
        </button>
      )}

      {data && data.length ? (
        data.map((orden, index) => (
          <ResumenVentas key={orden.id} orden={orden} indice={index + 1} />
        ))
      ) : (
        <p>No hay ordenes terminadas </p>
      )}
    </AdminLayout>
  );
};

export default OrdenesCompletadas;
