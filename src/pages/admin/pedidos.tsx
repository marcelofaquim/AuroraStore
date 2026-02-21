// src/pages/admin/pedidos.tsx
import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import { useState } from "react";

type Pedido = {
  id: string;
  cliente: string;
  total: number;
  status: "pendente" | "em andamento" | "entregue" | "cancelado";
};

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    { id: "1", cliente: "João Silva", total: 249.9, status: "pendente" },
    { id: "2", cliente: "Maria Souza", total: 149.9, status: "em andamento" },
  ]);

  const atualizarStatus = (id: string, novoStatus: Pedido["status"]) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: novoStatus } : p))
    );
  };

  return (
    <AdminGuard>
      <>
        <Head>
          <title>Admin - Pedidos | Aurora Store</title>
        </Head>

        <Header />

        <main className="container py-8">
          <h1 className="text-2xl font-bold mb-6">Gerenciar Pedidos</h1>

          <ul className="space-y-4">
            {pedidos.map((pedido) => (
              <li
                key={pedido.id}
                className="border rounded p-4 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Cliente:</strong> {pedido.cliente}
                  </p>
                  <p>
                    <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                  </p>
                  <p>
                    <strong>Status:</strong> {pedido.status}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => atualizarStatus(pedido.id, "em andamento")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Em andamento
                  </button>

                  <button
                    onClick={() => atualizarStatus(pedido.id, "entregue")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Entregue
                  </button>

                  <button
                    onClick={() => atualizarStatus(pedido.id, "cancelado")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>

        <Footer />
      </>
    </AdminGuard>
  );
}
