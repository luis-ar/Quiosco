import React from "react";

import { formatDistanceToNow } from "date-fns";
import esLocale from "date-fns/locale/es";
const Notificacion = ({ men }) => {
  const { mensaje, fecha } = men;
  const formatearTiempoPublicacion = (timestamp) => {
    const fecha = new Date(timestamp);
    return formatDistanceToNow(fecha, { addSuffix: false, locale: esLocale });
  };
  return (
    <div className="bg-slate-200 p-2 mb-2 last-of-type:mb-0">
      <h1 className="text-sm font-bold">{mensaje}</h1>
      <p className="text-sm font-bold">
        Recibido hace: {formatearTiempoPublicacion(parseInt(fecha))}
      </p>
    </div>
  );
};

export default Notificacion;
