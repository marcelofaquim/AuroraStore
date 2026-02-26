"use client";

import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Heroicons v2.2.0 — CubeIcon está em solid, os outros em outline
import { CubeIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon, UserGroupIcon } from "@heroicons/react/24/outline";

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <Head>
        <title>{title} | AuroraStore Admin</title>
      </Head>

      <Header />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-aurora-purple text-white p-6 space-y-4">
          <h2 className="text-xl font-bold mb-6">Administração</h2>

          <nav className="flex flex-col gap-2">
            <Link
              href="/admin/produtos"
              className={`flex items-center gap-3 px-3 py-2 rounded transition ${
                pathname === "/admin/produtos"
                  ? "bg-aurora-gold text-black font-semibold"
                  : "hover:bg-aurora-blue text-white"
              }`}
            >
              <CubeIcon
                className="h-5 w-5 text-aurora-purple flex-shrink-0"
                aria-hidden="true"
              />
              <span>Produtos</span>
            </Link>

            <Link
              href="/admin/pedidos"
              className={`flex items-center gap-3 px-3 py-2 rounded transition ${
                pathname === "/admin/pedidos"
                  ? "bg-aurora-gold text-black font-semibold"
                  : "hover:bg-aurora-blue text-white"
              }`}
            >
              <ShoppingCartIcon
                className="h-5 w-5 text-aurora-blue flex-shrink-0"
                aria-hidden="true"
              />
              <span>Pedidos</span>
            </Link>

            <Link
              href="/admin/usuarios"
              className={`flex items-center gap-3 px-3 py-2 rounded transition ${
                pathname === "/admin/usuarios"
                  ? "bg-aurora-gold text-black font-semibold"
                  : "hover:bg-aurora-blue text-white"
              }`}
            >
              <UserGroupIcon
                className="h-5 w-5 text-aurora-gold flex-shrink-0"
                aria-hidden="true"
              />
              <span>Usuários</span>
            </Link>
          </nav>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 p-8 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}
