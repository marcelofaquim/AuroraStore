// pages/perfil.tsx
import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Pedido = {
  id: string;
  data: string;
  total: number;
  status: "Em andamento" | "Entregue" | "Cancelado";
};

const pedidosMock: Pedido[] = [
  { id: "001", data: "10/12/2025", total: 199.9, status: "Entregue" },
  { id: "002", data: "15/12/2025", total: 99.9, status: "Em andamento" },
];

export default function PerfilPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redireciona no cliente se não estiver logado
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // evita renderizar antes do redirect
  }

  return (
    <>
      <Head>
        <title>Perfil - AuroraStore</title>
      </Head>

      <Header />

      <main className="container py-8 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Meu perfil</h1>

        <div className="bg-white shadow rounded p-6 flex flex-col gap-4">
          <p>
            <strong>Nome:</strong> {user.nome}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="bg-aurora-purple text-white px-4 py-2 rounded-md hover:bg-aurora-blue transition"
          >
            Sair da conta
          </button>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Meus pedidos</h2>
          <ul className="flex flex-col gap-2">
            {pedidosMock.map((pedido) => (
              <li
                key={pedido.id}
                className="border rounded p-3 flex justify-between"
              >
                <span>
                  Pedido #{pedido.id} - {pedido.data}
                </span>
                <span>
                  R$ {pedido.total.toFixed(2)} - {pedido.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
