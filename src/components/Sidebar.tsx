"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBagIcon, ClipboardDocumentListIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
    const router = useRouter();

    const links = [
        { href: "/admin/produtos", label: "Produtos", icon: ShoppingBagIcon }, 
        { href: "/admin/pedidos", label: "Pedidos", icon: ClipboardDocumentListIcon }, 
        { href: "/admin/usuarios", label: "Usuários", icon: UserGroupIcon },
    ];

    return (
        <aside className="w-64 bg-aurora-purple text-white h-screen flex flex-col p-4">
            <h2 className="text-xl font-bold mb-6">Aurora Admin</h2>
            <nav className="flex flex-col gap-4">
                {links.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-aurora-blue transition"
                    >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                    </Link>    
                ))}
            </nav>
        </aside>
    );
}