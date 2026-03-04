import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import  ProductGrid  from "@/components/ProductGrid";
export default function ProdutosPage() {
  const handleSearch = (term: string) => {
    console.log("Buscar:", term);
  };

  return (
    <>
      <Head>
        <title>AuroraStore — Produtos</title>
      </Head>

      <Header />

      <main className="container py-8">
        <h1 className="text-2xl md:text-3xl font-bold">Produtos</h1>
        <p className="text-gray-600 mt-2">Catálogo completo.</p>

        <div className="mt-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Produtos em destaque lado a lado */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-aurora-purple mb-4">
            Produtos em destaque
          </h2>
          {/* <ProductGrid /> */}
        </section>
      </main>

      <Footer />
    </>
  );
}
