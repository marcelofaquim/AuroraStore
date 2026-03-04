"use client";

import { useAuth } from "@/context/AuthContext";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Carregando...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg font-semibold">
          Você precisa estar logado para acessar esta página.
        </p>
      </main>
    );
  }

  if (user.role !== "admin") {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg font-semibold">
          Acesso negado. Apenas administradores podem visualizar esta página.
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
