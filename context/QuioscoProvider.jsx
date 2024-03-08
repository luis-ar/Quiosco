import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";

const QuioscoContext = createContext();
const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [codigo, setCodigo] = useState();
  const router = useRouter();
  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };
  useEffect(() => {
    obtenerCategorias();
  }, []);
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);
  useEffect(() => {
    if (pedido.length > 0) {
      const nuevoTotal = pedido.reduce(
        (total, pedi) => pedi.precio * pedi.cantidad + total,
        0
      );
      setTotal(nuevoTotal);
    }
  }, [pedido]);
  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    const element = document.getElementById(`prueba`);
    if (element) {
      router.push("/menu#prueba");
    }
  };
  const handleSetProducto = (producto) => {
    setProducto(producto);
  };
  const handleChangeModal = () => {
    setModal(!modal);
  };
  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    //validar si el producto existe
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      //Actualizaf la cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("Guardado Correctamente");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al Pedido");
    }
  };
  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter((produc) => produc.id === id);
    setProducto(productoActualizar[0]);
  };
  const handleEliminarProducto = (id) => {
    const productoEliminado = pedido.filter((produc) => produc.id !== id);
    setPedido(productoEliminado);
  };
  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/ordenes", {
        pedido,
        total,
        fecha: Date.now().toString(),
        codigo,
      });

      //resetear la app
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);
      toast.success("Pedido Realizado Correctamente");
      setTimeout(() => {
        router.push("/menu");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        handleSetProducto,
        producto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        setNombre,
        nombre,
        colocarOrden,
        total,
        setCorreo,
        correo,
        setPassword,
        password,
        mensaje,
        setMensaje,
        setCodigo,
        codigo,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
