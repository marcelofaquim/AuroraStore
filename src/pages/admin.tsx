import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

  // Se não estiver logado ou não for o admin -> redireciona
    if (!session || session.user.role !== "admin") {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [session, status, router]);

  //Evitar renderização antes da autorização
  
  if (status === "loading" || !isAuthorized) {
    return <p className="text-center mt-10">Carregando...</p>;
  }
  
  return (
    <>
      <Head>
        <title>Dashboard Administrativo — AuroraStore</title>
      </Head>

      <Header />

      <main className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard Administrativo</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card de Produtos */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Produtos</h2>
            <p>Gerencie o catálogo de produtos.</p>
            <button
              onClick={() => router.push("/admin/produtos")}
              className="mt-4 bg-aurora-purple text-white px-4 py-2 rounded hover:bg-aurora-blue transition"
            >
              Ir para produtos
            </button>
          </div>

          {/* Card de Pedidos */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
            <p>Acompanhe e atualize os pedidos dos clientes.</p>
            <button
              onClick={() => router.push("/admin/pedidos")}
              className="mt-4 bg-aurora-purple text-white px-4 py-2 rounded hover:bg-aurora-blue transition"
            >
              Ir para pedidos
            </button>
          </div>

          {/* Card de Usuários */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Usuários</h2>
            <p>Gerencie contas e permissões.</p>
            <button
              onClick={() => router.push("/admin/usuarios")}
              className="mt-4 bg-aurora-purple text-white px-4 py-2 rounded hover:bg-aurora-blue transition"
            >
              Ir para usuários
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
