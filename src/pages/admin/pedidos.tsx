// src/pages/admin/pedidos.tsx
import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import { useState, useEffect } from "react";

type StatusPedido =  "Pendente" | "Processando" | "Concluído" | "Cancelado";

type Pedido = {
  id: string;
  cliente: string;
  status: StatusPedido;
  total: number;
  
};

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [ novoPedido, setNovoPedido] = useState({ cliente: "", total: 0});
  
  //Carrehar pedidos da APi

  useEffect(() => {
    fetch("/api/pedidos")
    .then((res) => res.json())
    .then((data) => setPedidos(data));
  }, []);

  const adicionarPedido = async () => {
    if (!novoPedido.cliente || novoPedido.total <= 0) return;

    const res = await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...novoPedido, status: "Pendente" }),

    });

    const novo = await res.json();
    setPedidos([...pedidos, novo]);
    setNovoPedido({ cliente: "", total: 0 });
  };

  const atualizarStatus = async (id: string, status: StatusPedido) => {
    await fetch("/api/pedidos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p ))
    );
  };

  const excluirPedido = async (id: string) => {
    await fetch(`/api/pedidos?id=${id}`, {method: "DELETE" });
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <AdminGuard>
      <>
        <Head>
          <title>Admin - Pedidos | Aurora Store</title>
        </Head>

        <Header />

        <main className="container py-8">
          <h1 className="text-2xl font-bold mb-6">Gerenciar Pedidos</h1>

          {/* Lista de pedidos */}
          <ul className="space-y-4 mb-8">
            {pedidos.map((p) => (
              <li key={p.id} className="border rounded p-4 flex justify-between items-center bg-gray-50" >
                <span>
                  Pedido #{p.id} — {p.cliente} — R$ {p.total.toFixed(2)} —{" "}
                  <strong>{p.status}</strong>
                </span>
                <div className="flex gap-2">
                  <button onClick={() => atualizarStatus(p.id, "Processando")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Processar
                  </button>
                  <button onClick={() => atualizarStatus(p.id, "Concluído")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Concluir
                  </button>
                  <button onClick={() => excluirPedido(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Formulário de cadastro */}
          <div className="bg-white shadow rounded p-6 flex flex-col gap-4 max-w-md">
            <h2 className="text-xl font-semibold">Adicionar Pedido</h2>
            <input type="text" placeholder="Nome do cliente" value={novoPedido.cliente} onChange={(e) =>
                setNovoPedido({ ...novoPedido, cliente: e.target.value })
              }
              className="border rounded px-3 py-2"
            />
            <input type="number" placeholder="Valor total" value={novoPedido.total} onChange={(e) =>
                setNovoPedido({
                  ...novoPedido,
                  total: Number(e.target.value),
                })
              }
              className="border rounded px-3 py-2"
            />
            <button onClick={adicionarPedido} className="bg-aurora-purple text-white px-4 py-2 rounded hover:bg-aurora-blue transition" >
              Adicionar
            </button>
          </div>
        </main>

        <Footer />
      </>
    </AdminGuard>
  );
}
