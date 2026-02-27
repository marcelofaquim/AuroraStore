"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminGuard from "@/components/AdminGuard";
import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

type Produto = {
  id: number;
  nome: string;
  preco: number;
};

export default function AdminProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState({ nome: "", preco: 0 });

  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  const adicionarProduto = async () => {
    if (!novoProduto.nome || novoProduto.preco <= 0) return;

    const res = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoProduto),
    });

    if (res.ok) {
      const novo = await res.json();
      setProdutos([...produtos, novo]);
      setNovoProduto({ nome: "", preco: 0 });
    }
  };

  const excluirProduto = async (id: number) => {
    const res = await fetch(`/api/produtos?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminGuard>
      <AdminLayout title="Gerenciar Produtos">
        <main className="flex-1 px-12 py-12 bg-gray-50">
  {/* Título */}
  <div>
    <h1 className="text-4xl font-bold text-aurora-purple tracking-tight">
      
    </h1>
    <p className="text-gray-500 mt-2">
      Cadastre, visualize e gerencie os produtos da loja.
    </p>
  </div>

  {/* Lista de produtos */}
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
    {produtos.length === 0 ? (
      <p className="text-gray-500 text-center py-10 text-lg">
        Nenhum produto cadastrado.
      </p>
    ) : (
      <table className="w-full">
        <thead>
          <tr className="bg-aurora-purple/90 text-white text-sm uppercase tracking-wider">
            <th className="px-6 py-4 text-left">Nome</th>
            <th className="px-6 py-4 text-left">Preço</th>
            <th className="px-6 py-4 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, idx) => (
            <tr
              key={p.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {p.nome}
              </td>

              <td className="px-6 py-4 text-gray-600">
                R$ {p.preco.toFixed(2)}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center">
                  <button
                    onClick={() => excluirProduto(p.id)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>

  {/* Formulário */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 max-w-xl">
    <h2 className="text-2xl font-semibold text-aurora-purple mb-8">
      Adicionar Produto
    </h2>

    <div className="space-y-6">
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome do produto
        </label>
        <input
          type="text"
          value={novoProduto.nome}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, nome: e.target.value })
          }
          placeholder="Ex: Camiseta Aurora"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-aurora-blue focus:border-aurora-blue outline-none transition"
        />
      </div>

      {/* Preço */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preço
        </label>
        <input
          type="number"
          value={novoProduto.preco}
          onChange={(e) =>
            setNovoProduto({
              ...novoProduto,
              preco: Number(e.target.value),
            })
          }
          placeholder="Ex: 99.90"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-aurora-blue focus:border-aurora-blue outline-none transition"
        />
      </div>

      {/* Botão */}
      <button
        onClick={adicionarProduto}
        disabled={!novoProduto.nome || novoProduto.preco <= 0}
        className="w-full bg-aurora-purple hover:bg-aurora-blue text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Adicionar Produto
      </button>
    </div>
  </div>
</main>
      </AdminLayout>
    </AdminGuard>
  );
}
