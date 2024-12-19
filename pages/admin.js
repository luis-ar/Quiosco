import useSWR from "swr";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Orden from "../components/Orden";
import renderOrdersSection from "../components/FiltroEstadosPedido";

export default function Admin() {
  const fetcher = () => axios.get("/api/ordenes").then((datos) => datos.data);
  const { data, error, isLoading } = useSWR("/api/ordenes", fetcher, {
    refreshInterval: 5,
  });
  const pedidoPreparando = data
    ? data
        .map((orden) => {
          const pedidos = JSON.parse(orden.pedido);
          return {
            ...orden,
            pedido: pedidos.filter((item) => item.estado === 1),
          };
        })
        .filter((orden) => orden.pedido.length > 0)
    : [];

  const pedidoEnEspera = data
    ? data
        .map((orden) => {
          const pedidos = JSON.parse(orden.pedido);
          return {
            ...orden,
            pedido: pedidos.filter((item) => item.estado === 0),
          };
        })
        .filter((orden) => orden.pedido.length > 0)
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
