import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "@/store/useAuth";

//Schema de validação
const schema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6,"A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        const { login } = useAuth.getState();
        login({ nome: "Usuario", email: data.email });
        alert("Login realizado com sucesso !");
        setLoading(true);
        console.log("Login", data);
        //futuramente faremos a integração com AP/JWT
        setTimeout(() => {
            alert("Login realizado com sucesso!")
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <Head>
                <title>Login - AuroraStore</title>
            </Head>

            <Header />

            <main className="container py-8 max-w-md">
                <h1 className="text-2xl font-bold mb-6">Entrar na AuroraStore</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <label>
                        Email
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full border rounded px-3 py-2 mt-1"

                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm">{errors.email.message}</p>
                        )}    
                    </label>



                    <label>
                        Senha
                        <input
                            type="password"
                            {...register("senha")}
                            className="w-full border rounded px-3 py-2 mt-1"

                        />
                        {errors.senha && (
                            <p className="text-red-600 text-sm">{errors.senha.message}</p>
                        )}    
                    </label>


                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-aurora.purple text-white px-4 py-2 rounded-md hover:bg-aurora.blue transition"
                    >
                        {loading ? "Entrando..." : "Entrar"}    
                    </button>        
                </form>

                <p className="mt-4 text-sm text-gray-600">
                    Ainda não tem conta?{" "}
                    <a href="/register" className="text-aurora.blue hover:underline">
                        Cadastra-se aqui
                    </a>
                </p>
            </main>
        

            <Footer />            
        </>
    );

}