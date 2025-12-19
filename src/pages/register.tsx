import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "@/store/useAuth";
import Link from "next/link";


//schema de validação
const schema = z.object({
    nome: z.string().min(3, "Nome obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, " A sua senha deve ter pelo menos 06 caracteres"),
    confirmarSenha: z.string().min(6, "Confirmação de senha obrigatório"),
}).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["CorfirmarSenha"]
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);

    const{
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        const { login } = useAuth.getState();
        login({ nome: data.nome, email: data.email });
        alert("Conta criada e usuario autenticado")
        setLoading(true);
        console.log("Cadastro:", data);
        //Futuramente faremos a integração com API/JWT
        setTimeout(() => {
            alert("Conta criada com sucesso!");
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <Head>
                <title>Cadastro - AuroraStore</title>
            </Head>

            <Header />

            <main className="container py-8 max-w-md">
                <h1 className="text-2xl font-bold mb-6">Criar conta na AuroraStore</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-col gap-4">
                    <label>
                        Nome Completo
                        <input
                            {...register("nome")}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                        {errors.nome && (
                            <p className="text-red-600 text-sm">{errors.nome.message}</p>
                        )}    
                    </label>

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

          <label>
            Confirmar senha
            <input
              type="password"
              {...register("confirmarSenha")}
              className="w-full border rounded px-3 py-2 mt-1"
            />
            {errors.confirmarSenha && (
              <p className="text-red-600 text-sm">{errors.confirmarSenha.message}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-aurora.purple text-white px-4 py-2 rounded-md hover:bg-aurora.blue transition"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Já tem conta?{" "}
          <a href="/login" className="text-aurora.blue hover:underline">
            Entre aqui
          </a>
        </p>
      </main>

      <Footer />
    </>
  );    
}