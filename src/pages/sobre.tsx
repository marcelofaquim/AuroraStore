import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SobrePage() {
  return (
    <>
      <Head>
        <title>AuroraStore — Sobre</title>
      </Head>

      <Header />

      <main className="container py-8">
        <h1 className="text-2xl md:text-3xl font-bold">Sobre a AuroraStore</h1>
        <p className="text-gray-700 mt-4">
          A AuroraStore nasceu para iluminar sua experiência de compra com curadoria, tecnologia e design.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold">Missão</h2>
            <p className="text-gray-600 mt-2">Criar experiências incríveis de compra online.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold">Visão</h2>
            <p className="text-gray-600 mt-2">Ser referência em e-commerce moderno e acessível.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold">Valores</h2>
            <p className="text-gray-600 mt-2">Confiança, inovação e foco no cliente.</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
