import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";  
import { useCart } from "@/store/useCart";

export default function ProdutoPage() {
    const router = useRouter();
    const { id } = router.query; // pega o parametro da URL
    const product = products.find((p) => p.id === id); // busca no mock
    const add = useCart((s) => s.add);


    if (!product) {
        return (
            <>
                <Header />
                <main className="container py-8">
                   <h1 className="text-xl font bold>">Produto não encontrado</h1> 
                </main>
                <Footer />
            </>
        );
    }


    return (
        <>
            <Head>
                <title>{product.name} - AuroraStore</title> 
                <meta name="description" content={`Detalhes do produto ${product.name}`} />
            </Head>
        

            <Header />

            <main className="container py-8 grid md:grid-cols-2 gap-8">
                {/*Imagem */}
                <div className="aspect-square bg-gray-100 rouded-md flex items-center justify-center text-gray-400">
                    <span>Imagem</span>
                </div>

                {/* Detalhes */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-lg font-semibold text-aurora.purple">
                        R${product.price.toFixed(2)}
                    </p>

                    <button
                        onClick={() => add(product)}
                        className="bg-aurora.blue text-white rounded-md py-2 font-medium hover:bg-aurora.purple transition"
                        >
                            Adicionar ao Carrinho        
                    </button> 
                </div>
            </main>
        
            <Footer />
        </>
    );

} 










