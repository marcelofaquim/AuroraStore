import Head from "next/head";
import Header from "@/components/HeaderClient";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

// Schema de validação
const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/admin");
    } else {
      alert("Credenciais inválidas");
    }

    setLoading(false);
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
              {...register("password")}
              className="w-full border rounded px-3 py-2 mt-1"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-aurora-purple text-white px-4 py-2 rounded-md hover:bg-aurora-blue transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Ainda não tem conta?{" "}
          <Link href="/register" className="text-aurora-blue hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </main>

      <Footer />
    </>
  );
}
