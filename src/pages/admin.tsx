import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Garante que estamos no cliente antes de renderizar
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redireciona para login se não estiver logado
  useEffect(() => {
    if (isClient && !user) {
      router.push("/login");
    }
  }, [isClient, user, router]);

  // Evita renderização no SSR ou antes do login
  if (!isClient || !user) return null;

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
