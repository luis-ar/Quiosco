import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Modal from "react-modal";
import useQuiosco from "../hooks/useQuiosco";
import ModalProducto from "../components/ModalProducto";
import { ToastContainer } from "react-toastify";
import Pasos from "../components/Pasos";
import "react-toastify/dist/ReactToastify.css";
import BarraSuperior from "../components/BarraSuperior";
//instalar npm i react-modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#__next");
export default function Layout({ children, pagina }) {
  const { modal } = useQuiosco();
  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quiosco Cafeteria" />
      </Head>

      <div className="md:flex">
        <BarraSuperior />
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 flex flex-col ">
          <Sidebar />
        </aside>

        <main className="md:w-8/12 md:mt-20 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">
            <Pasos />
            {children}
          </div>
        </main>
      </div>
      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}
