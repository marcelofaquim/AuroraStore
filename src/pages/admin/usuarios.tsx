// src/pages/admin/usuarios.tsx
import Head from "next/head";
import Header from "@/components/HeaderClient"; // usa versão client-only
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import { useState } from "react";

type Usuario = {
  id: string;
  nome: string;
  email: string;
  role: "cliente" | "admin";
};

export default function AdminUsuariosPage() {
  // Estado local para simular usuários
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: "1", nome: "João Silva", email: "joao@email.com", role: "cliente" },
    { id: "2", nome: "Maria Souza", email: "maria@email.com", role: "admin" },
  ]);

  const alterarRole = (id: string, novaRole: Usuario["role"]) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: novaRole } : u))
    );
  };

  const excluirUsuario = (id: string) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <AdminGuard>
      <>
        <Head>
          <title>Admin — Usuários | AuroraStore</title>
        </Head>

        <Header />

        <main className="container py-8">
          <h1 className="text-2xl font-bold mb-6">Gerenciar Usuários</h1>

          <ul className="space-y-4">
            {usuarios.map((usuario) => (
              <li
                key={usuario.id}
                className="border rounded p-4 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Nome:</strong> {usuario.nome}
                  </p>
                  <p>
                    <strong>Email:</strong> {usuario.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {usuario.role}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => alterarRole(usuario.id, "cliente")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Cliente
                  </button>
                  <button
                    onClick={() => alterarRole(usuario.id, "admin")}
                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => excluirUsuario(usuario.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Excluir
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
