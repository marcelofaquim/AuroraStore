// pages/perfil.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/router";

export default function PerfilPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    //Se não estiver logado, será redirecionado para a pagina de login
    if(!user) {
        router.push("/login");
        return null;
    }

    return (
        <>
            <Head>
                <title>Perfil - AuroraStore</title>
            </Head>

            <Header />

            <main className="container py-8 max-w-md">
                <h1 className="text-2xl font-bold mb-6">Meu perfil</h1>


                <div className="bg-white shadow rounded p-6 flex flex-col gap-4">
                    <p>
                        <strong>Nome:</strong> { user.nome}
                    </p>
        
                     <p>
                        <strong>Email:</strong> { user.email}
                    </p>

                    <button
                        onClick={() => {
                            logout();
                            router.push("/login");
                        }} 
                        className="bg-aurora-purple text-white px-4 py-2 rounded-md hover:bg-aurora-blue transition"

                    >    
                         Sair da conta   
                        </button>
                </div>
            </main>
                
              <Footer />  
        
        </>
    )
}