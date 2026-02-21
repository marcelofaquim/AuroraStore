"use client";

import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/router"
import {CubeIcon,
    ShoppingCartIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

interface AdminLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
    const router = useRouter();

    const links = [
        { href: "/admin/produtos", label: "Produtos", icon: CubeIcon },
        { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCartIcon },
        { href: "/admin/usuarios", label: "Usuários", icon: UserGroupIcon },
    ];

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
                        {links.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                                    router.pathname === href
                                        ? "bg-aurora-gold text-black font-semibold"
                                        : "hover:bg-aurora-blue"
                                }`}
                            >
                                <Icon className="h-6 w-6 text-white" aria-hidden="true" />

                                {label}
                            </Link>    
                        ))}
                    </nav>
                </aside>

                {/* Conteudo principaç */}
                <main className="flex-1 p-8 bg-gray-50">
                    <h1 className="text-2xl font-bold mb-6">{title}</h1>
                    {children}
                </main>
            </div>

            <Footer />
        
        </>
    );
}