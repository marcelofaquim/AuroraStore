"use client";

import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Heroicons v2.2.0 — CubeIcon está em solid, os outros em outline
import { CubeIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon, UserGroupIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const links = [ 
    { href: "/admin/produtos", label: "Produtos", icon: CubeIcon }, 
    { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCartIcon }, 
    { href: "/admin/usuarios", label: "Usuários", icon: UserGroupIcon }, ];

  return (
    <>
      <Head>
        <title>{title} | AuroraStore Admin</title>
      </Head>

      <Header />

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Botão hamburgue (mobile )*/}
        <button
          className="fixed top-20 left-4 z-40 md:hidden bg-aurora-purple p-2 rounded-lg shadow-md"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6 text-white" />

         </button>  
        {/* Sidebar */}

        <aside className="w-64 max-w-[80%] bg-aurora-purple text-white p-6 shadow-xl transform transition-transform duration-300">
        <nav className="flex flex-col items-center gap-10">
          {links.map(({ href, icon: Icon }) => {
            const isActive = pathname === href;

      return (
        <Link
          key={href}
          href={href}
          className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
            isActive
              ? "bg-aurora-gold shadow-md"
              : "hover:bg-aurora-blue"
          }`}
        >
          <Icon
            className={`h-6 w-6 ${
              isActive ? "text-black" : "text-white"
            }`}
          />
        </Link>
      );
    })}
  </nav>
</aside>


            {/* Sidebar mobile (overlay) */} 
            {sidebarOpen && ( 
              <div className="fixed inset-0 z-50 flex"> 
                <div className="w-64 bg-aurora-purple text-white p-6 space-y-4"> 
                  <div className="flex justify-between items-center mb-6"> 
                    <h2 className="text-xl font-bold">Administração</h2> 
                    <button onClick={() => setSidebarOpen(false)}> 
                      <XMarkIcon className="h-6 w-6 " /> 
                    </button> 
                  </div> 
                  <nav className="flex flex-col gap-3"> 
                    {links.map(({ href, label, icon: Icon }) => { 
                      const isActive = pathname === href; 
                      return ( 
                      <Link 
                      key={href} 
                      href={href} 
                      className={`flex items-center gap-3 py-2 rounded-lg transition-all duration-200 ${ 
                        isActive 
                        ? "bg-aurora-gold text-black font-semibold" 
                        : "hover:bg-aurora-blue text-white" 
                      }`} 
                      
                      onClick={() => setSidebarOpen(false)} 
                      > 
                      <Icon 
                        className={`h-5 w-5 flex-shrink-0 ${ 
                          isActive ? "text-black" : "text-white" 
                        }`} 
                        /> 
                        <span className="text-sm">{label}</span> 
                        </Link> 
                        ); 
                      })} 
                      </nav> 
                      </div> 
                      
                      {/* Fundo escuro para fechar ao clicar */}
                       <div 
                        className="flex-1 bg-black bg-opacity-50" 
                        onClick={() => setSidebarOpen(false)} 
                       /> 
                      </div> 
                      )} 
                      
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
