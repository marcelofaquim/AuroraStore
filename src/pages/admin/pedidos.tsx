"use client";

import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import { useState, useEffect } from "react";
import { TrashIcon, PencilIcon, CheckIcon } from "@heroicons/react/24/solid";

type StatusPedido = "Pendente" | "Processando" | "Concluído" | "Cancelado";

type Pedido = {
  id: string;
  cliente: string;
  status: StatusPedido;
  total: number;
};

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [novoPedido, setNovoPedido] = useState({ cliente: "", total: 0 });
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editPedido, setEditPedido] = useState({ cliente: "", total: 0, status: "Pendente" as StatusPedido });

  // 🔎 Filtro, busca e paginação
  const [filtroStatus, setFiltroStatus] = useState<StatusPedido | "Todos">("Todos");
  const [buscaCliente, setBuscaCliente] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

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
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const salvarEdicao = async (id: string) => {
    const res = await fetch("/api/pedidos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...editPedido }),
    });

    if (res.ok) {
      const atualizado = await res.json();
      setPedidos((prev) => prev.map((p) => (p.id === id ? atualizado : p)));
      setEditandoId(null);
    }
  };

  const excluirPedido = async (id: string) => {
    await fetch(`/api/pedidos?id=${id}`, { method: "DELETE" });
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔎 Filtragem e busca
  const pedidosFiltrados = pedidos.filter((p) => {
    const statusOk = filtroStatus === "Todos" || p.status === filtroStatus;
    const clienteOk = p.cliente.toLowerCase().includes(buscaCliente.toLowerCase());
    return statusOk && clienteOk;
  });

  // 📑 Paginação
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const pedidosPaginados = pedidosFiltrados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(pedidosFiltrados.length / itensPorPagina);

  return (
    <AdminGuard>
      <>
        <Head>
          <title>Admin - Pedidos | Aurora Store</title>
        </Head>

        <Header />

        <main className="container py-8">
          <h1 className="text-3xl font-bold text-aurora-purple mb-6">Gerenciar Pedidos</h1>

          {/* 🔎 Filtros e busca */}
          <div className="flex gap-4 mb-6">
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as StatusPedido | "Todos")}
              className="border rounded px-3 py-2"
            >
              <option value="Todos">Todos</option>
              <option value="Pendente">Pendente</option>
              <option value="Processando">Processando</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>

            <input
              type="text"
              placeholder="Buscar cliente..."
              value={buscaCliente}
              onChange={(e) => setBuscaCliente(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          {pedidosFiltrados.length === 0 ? (
            <p className="text-gray-500 text-center py-10 text-lg">Nenhum pedido encontrado.</p>
          ) : (
            <>
              <ul className="space-y-4 mb-8">
                {pedidosPaginados.map((p) => (
                  <li key={p.id} className="border rounded p-4 flex justify-between items-center bg-white shadow-sm">
                    <div>
                      {editandoId === p.id ? (
                        <>
                          <input
                            type="text"
                            value={editPedido.cliente}
                            onChange={(e) =>
                              setEditPedido({ ...editPedido, cliente: e.target.value })
                            }
                            className="border rounded px-2 py-1 mb-2 w-full"
                          />
                          <input
                            type="number"
                            value={editPedido.total}
                            onChange={(e) =>
                              setEditPedido({ ...editPedido, total: Number(e.target.value) })
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        </>
                      ) : (
                        <span>
                          Pedido #{p.id} — {p.cliente} — R$ {p.total.toFixed(2)} —{" "}
                          <strong>{p.status}</strong>
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {editandoId === p.id ? (
                        <button
                          onClick={() => salvarEdicao(p.id)}
                          className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          <CheckIcon className="h-4 w-4" /> Salvar
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditandoId(p.id);
                            setEditPedido({ cliente: p.cliente, total: p.total, status: p.status });
                          }}
                          className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          <PencilIcon className="h-4 w-4" /> Editar
                        </button>
                      )}
                      <button
                        onClick={() => atualizarStatus(p.id, "Processando")}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Processar
                      </button>
                      <button
                        onClick={() => atualizarStatus(p.id, "Concluído")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Concluir
                      </button>
                      <button
                        onClick={() => excluirPedido(p.id)}
                        className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        <TrashIcon className="h-4 w-4" /> Excluir
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* 📑 Paginação */}
              <div className="flex gap-4 items-center mt-6">
                <button
                  disabled={paginaAtual === 1}
                  onClick={() => setPaginaAtual(paginaAtual - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Anterior
                </button>

                <span>
                  Página {paginaAtual} de {totalPaginas}
                </span>

                <button
                  disabled={paginaAtual === totalPaginas}
                  onClick={() => setPaginaAtual(paginaAtual + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            </>
          )}

                    {/* Formulário de cadastro */}
          <div className="bg-white shadow rounded p-6 flex flex-col gap-4 max-w-md mt-8">
            <h2 className="text-xl font-semibold text-aurora-purple">Adicionar Pedido</h2>
            <input
              type="text"
              placeholder="Nome do cliente"
              value={novoPedido.cliente}
              onChange={(e) => setNovoPedido({ ...novoPedido, cliente: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Valor total"
              value={novoPedido.total}
              onChange={(e) => setNovoPedido({ ...novoPedido, total: Number(e.target.value) })}
              className="border rounded px-3 py-2"
            />
            <button
              onClick={adicionarPedido}
              className="bg-aurora-purple text-white px-4 py-2 rounded hover:bg-aurora-blue transition"
            >
              Adicionar
            </button>
          </div>
        </main>

        <Footer />
      </>
    </AdminGuard>
  );
}
