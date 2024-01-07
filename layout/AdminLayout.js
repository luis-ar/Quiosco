import Head from "next/head";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasosAdmin from "../components/PasosAdmin";
import BarraSuperior from "../components/BarraSuperior";
export default function AdminLayout({ children, pagina }) {
  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quosco Cafetería" />
      </Head>

      <div className="md:flex">
        <BarraSuperior />
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5 flex justify-center">
          <img
            width={300}
            height={100}
            src="/assets/img/logo.jpg"
            alt="imagen logotipo"
            className="mt-14 md:mt-20 w-1/3 md:w-4/5"
          />
        </aside>

        <main className="md:w-8/12 md:mt-20 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll p-10">
          <PasosAdmin />
          <div>{children}</div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
