import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { ProductGrid } from "@/components/ProductCard";

export default function HomePage() {
  const handleSearch = (term: string) => {
    // TODO: implementar filtro real (por enquanto só loga)
    console.log("Buscar:", term);
  };

  return (
    <>
      <Head>
        <title>AuroraStore — Início</title>
        <meta name="description" content="AuroraStore, sua experiência de compra iluminada." />
      </Head>

      <Header />

      <main className="container py-8">
        <section className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Bem-vindo à AuroraStore</h1>
          <p className="text-gray-600 mt-2">Descubra produtos com a nossa curadoria iluminada.</p>
        </section>

        <SearchBar onSearch={handleSearch} />

        <section className="mt-10">
          <ProductGrid />
        </section>
      </main>

      <Footer />
    </>
  );
}
