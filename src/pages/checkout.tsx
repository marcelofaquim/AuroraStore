import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";  
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/store/useCart";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/router";

const schema = z.object({
    nome: z.string().min(3, "Nome obrigado"),
    email: z.string().email("Email inválido"),
    endereco: z.string().min(5, "Endreço Obrigatório"),
    cep: z.string().min(8, "CEP inválido"),
    pagamento: z.enum(["pix", "boleto", "cartao"])
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
    const { items, total, clear } = useCart();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        console.log("Pedido Confirmado", data);
        alert("Pedido confirmado com sucesso!");
        clear();
    };

    
        const { user } = useAuth();
        const router = useRouter();

        if(!user) {
            router.push("/login");
            return null;
        }

    return (
        <>
            <Head>
                <title>Checkout - AuroraStore</title>
            </Head>

            <Header />
        
            <main className="container py-8">
                <h1 className="text-2xl font-bold mb-6">Finalizar compra</h1>

                {items.length === 0 ? (
                    <p className="text-gray-600">Seu carrinho esta vazio.</p>
                ): (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid d:grid-cols-2 gap-6"
                    >

                        <div className="flex flex-col gap-4">
                            <label>
                                Nome Completo
                                <input
                                    {...register("nome")}
                                    className="w-full border rouded px-3 py-2 mt-1"
                                />
                                {errors.nome && (
                                    <p className="text-red-600 text-sm">{errors.nome.message}</p>
                                )}    
                            </label>

                            <label>
                                Email
                                <input
                                    {...register("email")}
                                    type="email"
                                    className="w-full border rouded px-3 py-2 mt-1"
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm">{errors.email.message}</p>
                                )}    
                            </label>


                            <label>
                                Endereço
                                <input
                                    {...register("endereco")}
                                    className="w-full border rouded px-3 py-2 mt-1"
                                />
                                {errors.endereco && (
                                    <p className="text-red-600 text-sm">{errors.endereco.message}</p>
                                )}    
                            </label>



                             <label>
                                CEP
                                <input
                                    {...register("cep")}
                                    className="w-full border rouded px-3 py-2 mt-1"
                                />
                                {errors.cep && (
                                    <p className="text-red-600 text-sm">{errors.cep.message}</p>
                                )}    
                            </label> 
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold">Forma de pagamentos</h2>

                              <label className="flex items-center gap-2">
                                
                                <input
                                    type="radio"
                                    value="pix"
                                    {...register("pagamento")}
                                />
                                    Pix
                              </label>

                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio"
                                        value="boleto"
                                        {...register("pagamento")}
                                    />

                                    Boleto
                                </label>  



                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio"
                                        value="cartao"
                                        {...register("pagamento")}
                                    />
                                    Cartão de Crédito
                                </label> 


                                {errors.pagamento && (
                                    <p className="text-red-600 text-sm">{errors.pagamento.message}</p>
                                )}

                                <div className="mt-6">
                                    <p className="text-lg font-bold mb-2">
                                        Total: R${total().toFixed(2)}
                                    </p>
                                    <button 
                                        type="submit"
                                        className="bg-aurora.purple text-white px-4 py-2 rounded-md hover:bg-aurora.blue transition"
                                    >
                                        Confirmar pedido
                                    </button>
                                </div>
                        </div>
                    </form>    
                )}
            </main>
        
        <Footer />
        
        </>
    );
    
}