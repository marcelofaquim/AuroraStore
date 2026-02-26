// src/pages/admin/produtos.tsx
import Head from "next/head";
import Header from "@/components/HeaderClient"; // usa versão client-only
import Footer from "@/components/Footer";
import AdminLayout from "@/components/AdminLayout";
import AdminGuard from "@/components/AdminGuard";
import { useState, useEffect } from "react";

type Produto = {
  id: string;
  nome: string;
  preco: number;
};

export default function AdminProdutosPage() {
  // Estado local para simular produtos
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [ novoProduto, setNovoProduto] = useState({ nome: "", preco: 0});

  //Carregar a API

  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
  }, []);
   
  const adicionarProduto = async () => {
    if (!novoProduto.nome || novoProduto.preco <= 0) return;

    const res = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(novoProduto),
    });

    const novo = await res.json(); 
    setProdutos([...produtos, novo]);
    setNovoProduto({ nome: "", preco: 0 });
  };

  const excluirProduto = async (id: string) => {
    await fetch(`/api/produtos?id=${id}`, { method: "DELETE" });
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AdminGuard>
      <AdminLayout title="Gerenciar Produtos">
        {/* Conteudo da pagina */}
      
      <>
        <Head>
          <title>Admin — Produtos | AuroraStore</title>
        </Head>

        <Header />

        <main className="container py-8">
          <h1 className="text-2xl font-bold mb-6">Gerenciar Produtos</h1>

          {/* Lista de produtos */}
          <ul className="space-y-4 mb-8">
            {produtos.map((p) => (
              <li
                key={p.id}
                className="border rounded p-4 flex justify-between items-center bg-gray-50"
              >
                <span>
                  {p.nome} — R$ {p.preco.toFixed(2)}
                </span>
                <button
                  onClick={() => excluirProduto(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>

          {/* Formulário de cadastro */}
          <div className="bg-white shadow rounded p-6 flex flex-col gap-4 max-w-md">
            <h2 className="text-xl font-semibold">Adicionar Produto</h2>
            <input
              type="text"
              placeholder="Nome do produto"
              value={novoProduto.nome}
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, nome: e.target.value })
              }
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Preço"
              value={novoProduto.preco}
              onChange={(e) =>
                setNovoProduto({
                  ...novoProduto,
                  preco: Number(e.target.value),
                })
              }
              className="border rounded px-3 py-2"
            />
            <button
              onClick={adicionarProduto}
              className="bg-aurora-purple text-white px-4 py-2 rounded hover:bg-aurora-blue transition"
            >
              Adicionar
            </button>
          </div>
        </main>

        <Footer />
      </>
      </AdminLayout>
    </AdminGuard>

  );
}

