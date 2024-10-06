import Orden from "./Orden";

export default function renderOrdersSection(orders, title, bgColor) {
  if (orders.length === 0) return null;

  return (
    <div className="mb-6">
      <div
        className={`font-bold py-2 ${bgColor} text-white text-center rounded-lg mb-3`}
      >
        {title}
      </div>
      {orders.map((orden, index) => (
        <Orden key={orden.id} orden={orden} indice={index + 1} />
      ))}
    </div>
  );
}
