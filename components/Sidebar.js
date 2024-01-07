import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "./Categoria";
const Sidebar = () => {
  const { categorias } = useQuiosco();
  return (
    <>
      <div className=" mt-14 md:mt-20">
        <img
          width={200}
          height={80}
          src="/assets/img/logo.jpg"
          alt="imagen logotipo"
          className="m-auto pt-3"
        />
      </div>

      <nav className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
