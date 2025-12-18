import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useAuth } from "@/store/useAuth";

export default function Header() {
    const items = useCart((s) => s.items);
    const { user, logout } = useAuth();

    return (
        <header className="bg-aurora-gradient text-white">
            <div className="container flex items-center justify-between py-4">
                <Link href="/" className="text-xl font-semibold tracking-wide">
                    AuroraStore
                </Link>

                <nav className="hidden md:flex gap-6 font-medium">
                    <Link href="/">Inicio</Link>
                    <Link href="/produtos">Produtos</Link>
                    <Link href="/sobre">Sobre</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/produtos" className="hidden sm:block">
                        <span className="sr-only">Buscar</span>
                        🔍
                    </Link>
                    <Link href="/cart" className="relative">
                    <span className="sr-only">Carrinho</span>
                    🛒
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-aurora.gold text-black text-xs font-bold px-2 py-0.5 rounded-full">
                            {items.length}
                        </span>
                    )}
                    </Link>

                    { user ? (
                        <div className="flex items-center gap-2">
                            <span>👤 {user.nome}</span>
                            <button
                                onClick={logout}
                                className="bg-aurora-blue px-2 py-1 rounded hover:bg-aurora-purple transition"
                            >
                                Sair    
                            </button>  
                        </div>

                    ): ( 
                        <Link href="/login">
                    <span className="sr-only">Perfil</span>
                    👤
                    </Link>
                    )}
                </div>
            </div>
        </header>
    );
}