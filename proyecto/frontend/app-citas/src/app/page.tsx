"use client"
// import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    
      <>
      {/* <Breadcrumbs items={[{ href: "/", label: "Inicio"}]}/> */}

      {/* <main>
        <h1>Hello word</h1>
      </main> */}

      <main className="page-background">
        <section className="hero-section">
          <h1 className="title">
            Organiza tus citas. Gana tiempo. Atiende mejor.
          </h1>

          <img src="https://media.istockphoto.com/id/2185364720/es/foto/psic%C3%B3loga-charla-y-mujer-mayor-con-notas-y-sonrisa-de-valoraci%C3%B3n-de-salud-mental-en-consulta.jpg?s=612x612&w=0&k=20&c=HGbmjGCXA5MsxAvpKXvaGYu_U3qxOzcZyss661P7ho4="
          alt="Promoción de plataforma de citas" className="hero-image" />

          <p className="subtitle">
            Ideal para negocios y consultorios que quieren orden y profesionalismo.
          </p>

          <p className="body-text">
            Una plataforma web para que tus clientes reserven en línea y tú mantengas el control.
          </p>
          
          <button className="btn-primary" onClick={() => router.push ('/login')} >
            Comenzar
          </button>

        </section>
      </main>
      </>
  );
}
