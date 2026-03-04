"use client";

import AdminLayout from "@/components/AdminLayout";
import AdminGuard from "@/components/AdminGuard";
import { useState, useEffect } from "react";
import { TrashIcon, PencilIcon, CheckIcon } from "@heroicons/react/24/solid";
import CartSummary from "@/components/CartSummary";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/lib/products";

export default function AdminProdutosPage() { 
  const [produtos, setProdutos] = useState<Product[]>([]); 
  const [novoProduto, setNovoProduto] = useState<Product>({ 
    id: "", 
    name: "", 
    price: 0, 
    rating: 0, 
    image: "/placeholder.png", 
  }); 
  
  const [editandoId, setEditandoId] = useState<string | null>(null); 
  const [editProduto, setEditProduto] = useState<Product>({ 
    id: "", 
    name: "", 
    price: 0, 
    rating: 0, 
    image: "/placeholder.png", 
  }); 
  
  // Carregar produtos da API já tipados 
  useEffect(() => { 
    fetch("/api/produtos") 
    .then((res) => res.json()) 
    .then((data: Product[]) => 
      setProdutos( 
        data.map((p) => ({ 
          ...p, 
          price: Number(p.price) || 0, 
          rating: p.rating ?? 0, 
          image: p.image ?? "/placeholder.png", 
        })) 
      ) 
    );
   }, []); 
   // Adicionar produto 
   const adicionarProduto = async () => { 
    if (!novoProduto.name || novoProduto.price <= 0) return; 

    const res = await fetch("/api/produtos", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ 
        id: novoProduto.id, 
        name: novoProduto.name, 
        price: Number(novoProduto.price), 
        rating: novoProduto.rating ?? 0, 
        image: novoProduto.image ?? "/placeholder.png", 
      }),
     }); 
     
     if (res.ok) { 
      const novo: Product = await res.json(); 
      setProdutos([ 
        ...produtos, 
        { 
          ...novo, 
          price: Number(novo.price) || 0, 
          rating: novo.rating ?? 0, 
          image: novo.image ?? "/placeholder.png", 
        },
       ]); 
       setNovoProduto({ 
        id: "", 
        name: "", 
        price: 0, 
        rating: 0, 
        image: "/placeholder.png", 
      }); 
    } 
  }; 
  // Excluir produto 
  const excluirProduto = async (id: string) => { 
    const res = await fetch(`/api/produtos?id=${id}`, { method: "DELETE" }); 
    if (res.ok) { 
      setProdutos((prev) => prev.filter((p) => p.id !== id)); 
    } 
  }; 
  
  // Salvar edição 
  const salvarEdicao = async (id: string) => { 
    const res = await fetch("/api/produtos", { 
      method: "PUT", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ 
        id, 
        name: editProduto.name, 
        price: Number(editProduto.price), 
        rating: editProduto.rating ?? 0, 
        image: editProduto.image ?? "/placeholder.png", 
      }),
     }); 
     
     if (res.ok) { 
      const atualizado: Product = await res.json(); 
      setProdutos((prev) => 
        prev.map((p) => p.id === id 
        ? { 
          ...atualizado, 
          price: Number(atualizado.price) || 0, 
          rating: atualizado.rating ?? 0, 
          image: atualizado.image ?? "/placeholder.png", 
        } 
        : p 
      ) 
    ); 
    setEditandoId(null); 
  } 
};


  return (
    <AdminGuard>
      <AdminLayout title="Gerenciar Produtos">
        <main className="flex-1 px-12 py-12 bg-gray-50 space-y-10">
          <p className="text-gray-500 mt-2">
            Cadastre, visualize, edite e gerencie os produtos da loja.
          </p>

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
                  {produtos.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {editandoId === p.id ? (
                          <input
                            type="text"
                            value={editProduto.name}
                            onChange={(e) =>
                              setEditProduto({ ...editProduto, name: e.target.value })
                            }
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          p.name
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {editandoId === p.id ? (
                          <input
                            type="number"
                            value={editProduto.price}
                            onChange={(e) =>
                              setEditProduto({
                                ...editProduto,
                                price: Number(e.target.value),
                              })
                            }
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          `R$ ${(Number(p.price) || 0).toFixed(2)}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          {editandoId === p.id ? (
                            <button
                              onClick={() => salvarEdicao(p.id)}
                              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
                            >
                              <CheckIcon className="h-4 w-4" /> Salvar
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setEditandoId(p.id);
                                setEditProduto({
                                  ...p,
                                  rating: p.rating ?? 0,
                                  image: p.image ?? "/placeholder.png",
                                });
                              }}
                              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
                            >
                              <PencilIcon className="h-4 w-4" /> Editar
                            </button>
                          )}
                          <button
                            onClick={() => excluirProduto(p.id)}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
                          >
                            <TrashIcon className="h-4 w-4" /> Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Produtos em destaque + carrinho */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-aurora-purple mb-4">
              Produtos em destaque
            </h2>
            <ProductGrid products={produtos} />
            <CartSummary />
          </section>

          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 max-w-xl">
            <h2 className="text-2xl font-semibold text-aurora-purple mb-8">
              Adicionar Produto
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do produto
                </label>
                <input
                  type="text"
                  value={novoProduto.name}
                  onChange={(e) =>
                    setNovoProduto({ ...novoProduto, name: e.target.value })
                  }
                  placeholder="Ex: Camiseta Aurora"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-aurora-blue focus:border-aurora-blue outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço
                </label>
                <input
                  type="number"
                  value={novoProduto.price}
                  onChange={(e) =>
                    setNovoProduto({
                      ...novoProduto,
                      price: Number(e.target.value),
                    })
                  }
                  placeholder="Ex: 99.90"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-aurora-blue focus:border-aurora-blue outline-none transition"
                />
              </div>
              <button
                onClick={adicionarProduto}
                disabled={!novoProduto.name || novoProduto.price <= 0}
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
