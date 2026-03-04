import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import  ProductGrid  from "@/components/ProductCard";

export default function HomePage() {
  const handleSearch = (term: string) => {
    // Aqui você pode integrar com a API de produtos
    console.log("Buscar:", term);
  };

  return (
    <>
      <Head>
        <title>AuroraStore — Início</title>
        <meta
          name="description"
          content="AuroraStore, sua experiência de compra iluminada."
        />
      </Head>

      <Header />

      <main className="container py-8">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h1 className="text-3xl font-bold text-aurora-purple">
            Bem-vindo à AuroraStore
          </h1>
          <p className="text-gray-600 mt-2">
            Descubra produtos com a nossa curadoria iluminada.
          </p>
          <button className="mt-4 bg-aurora-purple text-white px-6 py-2 rounded hover:bg-aurora-blue transition">
            Ver ofertas da semana
          </button>
        </section>

        {/* Search Bar */}
        <section className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </section>

        {/* Categorias rápidas */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-aurora-purple mb-4">
            Categorias rápidas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { nome: "Eletrônicos", icon: "💻" },
              { nome: "Moda", icon: "👗" },
              { nome: "Casa", icon: "🏠" },
              { nome: "Beleza", icon: "💄" },
            ].map((cat) => (
              <div
                key={cat.nome}
                className="border rounded p-4 text-center shadow-sm bg-white hover:shadow-md transition"
              >
                <div className="h-16 flex items-center justify-center text-3xl">
                  {cat.icon}
                </div>
                <span className="font-semibold">{cat.nome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ofertas especiais */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-aurora-purple mb-4">
            Ofertas especiais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aqui futuramente você pode integrar com a API de produtos */}
            <div className="h-40 bg-gray-100 rounded shadow-sm flex items-center justify-center text-lg font-semibold">
              🔥 Notebook Gamer em promoção
            </div>
            <div className="h-40 bg-gray-100 rounded shadow-sm flex items-center justify-center text-lg font-semibold">
              🔥 Smartphone Premium com desconto
            </div>
          </div>
        </section>

        {/* Produtos em destaque */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-aurora-purple mb-4">
            Produtos em destaque
          </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
            </div>  
        </section>
      </main>

      <Footer />
    </>
  );
}
