import axios from "axios";

const EnviarMensaje = async (codigo, mensajes) => {
  try {
    await axios.post(`/api/mensajes/${codigo}`, mensajes);
  } catch (error) {
    console.log(error);
  }
};

export default EnviarMensaje;
