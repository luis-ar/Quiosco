import useSWR from "swr";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Orden from "../components/Orden";
import renderOrdersSection from "../components/FiltroEstadosPedido";

export default function Admin() {
  const fetcher = () => axios.get("/api/ordenes").then((datos) => datos.data);
  const { data, error, isLoading } = useSWR("/api/ordenes", fetcher, {
    refreshInterval: 100,
  });

  const pedidoPreparando = data
    ? data.filter((orden) => orden.pedido.some((item) => item.estado === 1))
    : [];

  const pedidoEnEspera = data
    ? data.filter((orden) => orden.pedido.some((item) => item.estado === 0))
    : [];

  return (
    <AdminLayout pagina={"Admin"}>
      {data && data.length ? (
        <div>
          {renderOrdersSection(pedidoPreparando, "Preparando", "bg-green-600")}
          {renderOrdersSection(pedidoEnEspera, "En espera", "bg-amber-600")}
        </div>
      ) : (
        <p>No hay órdenes pendientes</p>
      )}
    </AdminLayout>
  );
}
