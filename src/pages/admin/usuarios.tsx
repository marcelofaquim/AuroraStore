"use client";

import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import { useState, useEffect } from "react";
import { TrashIcon, PencilIcon, CheckIcon } from "@heroicons/react/24/solid";

type Role = "admin" | "cliente";

type Usuario = {
  id: string;
  nome: string;
  email: string;
  role: Role;
};

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [novoUsuario, setNovoUsuario] = useState({ nome: "", email: "", role: "cliente" as Role });
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editUsuario, setEditUsuario] = useState({ nome: "", email: "", role: "cliente" as Role });

  // 🔎 Filtro, busca e paginação
  const [filtroRole, setFiltroRole] = useState<Role | "Todos">("Todos");
  const [buscaNome, setBuscaNome] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  useEffect(() => {
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  const adicionarUsuario = async () => {
    if (!novoUsuario.nome || !novoUsuario.email) return;

    const res = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    });

    const novo = await res.json();
    setUsuarios([...usuarios, novo]);
    setNovoUsuario({ nome: "", email: "", role: "cliente" });
  };

  const salvarEdicao = async (id: string) => {
    const res = await fetch("/api/usuarios", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...editUsuario }),
    });

    if (res.ok) {
      const atualizado = await res.json();
      setUsuarios((prev) => prev.map((u) => (u.id === id ? atualizado : u)));
      setEditandoId(null);
    }
  };

  const excluirUsuario = async (id: string) => {
    await fetch(`/api/usuarios?id=${id}`, { method: "DELETE" });
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  // 🔎 Filtragem e busca
  const usuariosFiltrados = usuarios.filter((u) => {
    const roleOk = filtroRole === "Todos" || u.role === filtroRole;
    const nomeOk = u.nome.toLowerCase().includes(buscaNome.toLowerCase());
    return roleOk && nomeOk;
  });

  // 📑 Paginação
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const usuariosPaginados = usuariosFiltrados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina);

  return (
    <AdminGuard>
      <>
        <Head>
          <title>Admin - Usuários | Aurora Store</title>
        </Head>

        <Header />

        <main className="container py-8">
          <h1 className="text-3xl font-bold text-aurora-purple mb-6">Gerenciar Usuários</h1>

          {/* 🔎 Filtros e busca */}
          <div className="flex gap-4 mb-6">
            <select
              value={filtroRole}
              onChange={(e) => setFiltroRole(e.target.value as Role | "Todos")}
              className="border rounded px-3 py-2"
            >
              <option value="Todos">Todos</option>
              <option value="admin">Admin</option>
              <option value="cliente">Cliente</option>
            </select>

            <input
              type="text"
              placeholder="Buscar usuário..."
              value={buscaNome}
              onChange={(e) => setBuscaNome(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          {usuariosFiltrados.length === 0 ? (
            <p className="text-gray-500 text-center py-10 text-lg">Nenhum usuário encontrado.</p>
          ) : (
            <>
              <ul className="space-y-4 mb-8">
                {usuariosPaginados.map((u) => (
                  <li key={u.id} className="border rounded p-4 flex justify-between items-center bg-white shadow-sm">
                    <div>
                      {editandoId === u.id ? (
                        <>
                          <input
                            type="text"
                            value={editUsuario.nome}
                            onChange={(e) => setEditUsuario({ ...editUsuario, nome: e.target.value })}
                            className="border rounded px-2 py-1 mb-2 w-full"
                          />
                          <input
                            type="text"
                            value={editUsuario.email}
                            onChange={(e) => setEditUsuario({ ...editUsuario, email: e.target.value })}
                            className="border rounded px-2 py-1 mb-2 w-full"
                          />
                          <select
                            value={editUsuario.role}
                            onChange={(e) => setEditUsuario({ ...editUsuario, role: e.target.value as Role })}
                            className="border rounded px-2 py-1 w-full"
                          >
                            <option value="admin">Admin</option>
                            <option value="cliente">Cliente</option>
                          </select>
                        </>
                      ) : (
                        <span>
                          {u.nome} — {u.email} — <strong>{u.role}</strong>
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {editandoId === u.id ? (
                        <button
                          onClick={() => salvarEdicao(u.id)}
                          className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          <CheckIcon className="h-4 w-4" /> Salvar
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditandoId(u.id);
                            setEditUsuario({ nome: u.nome, email: u.email, role: u.role });
                          }}
                          className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          <PencilIcon className="h-4 w-4" /> Editar
                        </button>
                      )}
                      <button
                        onClick={() => excluirUsuario(u.id)}
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
            <h2 className="text-xl font-semibold text-aurora-purple">Adicionar Usuário</h2>
            <input
              type="text"
              placeholder="Nome"
              value={novoUsuario.nome}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Email"
              value={novoUsuario.email}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <select
              value={novoUsuario.role}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, role: e.target.value as Role })}
              className="border rounded px-3 py-2"
            >
              <option value="admin">Admin</option>
              <option value="cliente">Cliente</option>
            </select>
            <button
              onClick={adicionarUsuario}
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
